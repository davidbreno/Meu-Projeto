"""Pipeline local de restauração conservadora para páginas escaneadas."""

from dataclasses import dataclass

import cv2
import numpy as np
from PIL import Image

CM_TO_INCH = 1 / 2.54
TARGET_WIDTH_CM = 15.0
TARGET_HEIGHT_CM = 21.0
TARGET_DPI = 300
TARGET_WIDTH_PX = int(round(TARGET_WIDTH_CM * CM_TO_INCH * TARGET_DPI))
TARGET_HEIGHT_PX = int(round(TARGET_HEIGHT_CM * CM_TO_INCH * TARGET_DPI))


@dataclass
class RestorationConfig:
    intensity: str = "média"  # leve | média | forte
    remove_dark_borders: bool = True
    uniform_background: bool = True


def _params_by_intensity(level: str) -> dict:
    mapping = {
        "leve": {
            "median_ksize": 3,
            "bg_blur": 29,
            "shadow_strength": 0.30,
            "speckle_threshold": 5,
            "unsharp_amount": 0.35,
            "gamma": 1.02,
        },
        "média": {
            "median_ksize": 3,
            "bg_blur": 39,
            "shadow_strength": 0.45,
            "speckle_threshold": 9,
            "unsharp_amount": 0.42,
            "gamma": 1.04,
        },
        "forte": {
            "median_ksize": 5,
            "bg_blur": 49,
            "shadow_strength": 0.58,
            "speckle_threshold": 15,
            "unsharp_amount": 0.50,
            "gamma": 1.06,
        },
    }
    return mapping.get(level, mapping["média"])


def _remove_small_dark_speckles(gray: np.ndarray, area_limit: int) -> np.ndarray:
    """Remove manchas pequenas/isoladas sem tocar em texto significativo."""
    binary = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)[1]
    num_labels, labels, stats, _ = cv2.connectedComponentsWithStats(binary, connectivity=8)

    cleaned = gray.copy()
    for i in range(1, num_labels):
        area = stats[i, cv2.CC_STAT_AREA]
        x = stats[i, cv2.CC_STAT_LEFT]
        y = stats[i, cv2.CC_STAT_TOP]
        w = stats[i, cv2.CC_STAT_WIDTH]
        h = stats[i, cv2.CC_STAT_HEIGHT]

        # Critério conservador: remove apenas pontos bem pequenos e quase quadrados.
        if area <= area_limit and max(w, h) <= 6:
            mask = labels == i
            cleaned[mask] = 245
    return cleaned


def _attenuate_dark_border(gray: np.ndarray) -> np.ndarray:
    """Suaviza molduras escuras comuns de digitalizações sem cortar conteúdo."""
    h, w = gray.shape
    border = max(12, int(min(h, w) * 0.03))

    mask = np.zeros_like(gray, dtype=np.uint8)
    mask[:border, :] = 255
    mask[-border:, :] = 255
    mask[:, :border] = 255
    mask[:, -border:] = 255

    bright = cv2.GaussianBlur(gray, (0, 0), sigmaX=7)
    output = gray.copy()
    output[mask == 255] = np.maximum(output[mask == 255], bright[mask == 255])

    return output


def _uniform_background(gray: np.ndarray, blur_size: int, strength: float, gamma: float) -> np.ndarray:
    """Corrige variações de iluminação e sombras leves do scanner."""
    blur_size = blur_size if blur_size % 2 == 1 else blur_size + 1
    local_bg = cv2.GaussianBlur(gray, (blur_size, blur_size), 0)

    # Eleva regiões sombreadas sem estourar texto.
    corrected = cv2.addWeighted(gray, 1.0 + strength, local_bg, -strength, 0)
    corrected = np.clip(corrected, 0, 255).astype(np.uint8)

    # Ajuste suave de gama para fundo mais homogêneo.
    lut = np.array([((i / 255.0) ** (1.0 / gamma)) * 255 for i in range(256)], dtype=np.uint8)
    corrected = cv2.LUT(corrected, lut)
    return corrected


def _safe_unsharp(gray: np.ndarray, amount: float) -> np.ndarray:
    """Nitidez leve para melhorar leitura, preservando texto pequeno."""
    blurred = cv2.GaussianBlur(gray, (0, 0), sigmaX=1.0)
    sharpened = cv2.addWeighted(gray, 1.0 + amount, blurred, -amount, 0)
    return np.clip(sharpened, 0, 255).astype(np.uint8)


def _place_on_print_canvas(gray: np.ndarray) -> Image.Image:
    """Centraliza a página restaurada em canvas 15x21 cm @ 300 DPI sem distorcer."""
    src_h, src_w = gray.shape
    scale = min(TARGET_WIDTH_PX / src_w, TARGET_HEIGHT_PX / src_h)
    new_w = max(1, int(round(src_w * scale)))
    new_h = max(1, int(round(src_h * scale)))

    resized = cv2.resize(gray, (new_w, new_h), interpolation=cv2.INTER_AREA)

    canvas = np.full((TARGET_HEIGHT_PX, TARGET_WIDTH_PX), 255, dtype=np.uint8)
    x0 = (TARGET_WIDTH_PX - new_w) // 2
    y0 = (TARGET_HEIGHT_PX - new_h) // 2
    canvas[y0:y0 + new_h, x0:x0 + new_w] = resized

    img = Image.fromarray(canvas, mode="L").convert("RGB")
    img.info["dpi"] = (TARGET_DPI, TARGET_DPI)
    return img


def restore_scanned_page(input_path: str, config: RestorationConfig | None = None) -> Image.Image:
    """Executa restauração local conservadora e retorna imagem pronta para impressão."""
    if config is None:
        config = RestorationConfig()

    params = _params_by_intensity(config.intensity)

    bgr = cv2.imread(input_path, cv2.IMREAD_COLOR)
    if bgr is None:
        raise ValueError("Não foi possível ler a imagem de entrada. Verifique o caminho e o formato.")

    gray = cv2.cvtColor(bgr, cv2.COLOR_BGR2GRAY)

    # 1) Redução leve de ruído pontual (manchas pequenas).
    if params["median_ksize"] >= 3:
        gray = cv2.medianBlur(gray, params["median_ksize"])
    gray = _remove_small_dark_speckles(gray, params["speckle_threshold"])

    # 2) Atenua bordas escuras de scanner (opcional).
    if config.remove_dark_borders:
        gray = _attenuate_dark_border(gray)

    # 3) Uniformiza fundo e suaviza sombras (opcional).
    if config.uniform_background:
        gray = _uniform_background(
            gray,
            blur_size=params["bg_blur"],
            strength=params["shadow_strength"],
            gamma=params["gamma"],
        )

    # 4) Nitidez conservadora para preservar caracteres técnicos.
    gray = _safe_unsharp(gray, amount=params["unsharp_amount"])

    # 5) Centralização em 15x21 cm, 300 DPI.
    return _place_on_print_canvas(gray)
