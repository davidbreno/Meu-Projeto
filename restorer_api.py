"""Stub para futura integração com API externa de restauração.

Mantido separado para facilitar troca de backend sem alterar a interface gráfica.
"""

from dataclasses import dataclass
from PIL import Image


@dataclass
class ApiRestorationConfig:
    intensity: str = "média"
    remove_dark_borders: bool = True
    uniform_background: bool = True


class RemoteRestorationNotImplementedError(NotImplementedError):
    pass


def restore_scanned_page_via_api(input_path: str, config: ApiRestorationConfig | None = None) -> Image.Image:
    """Assinatura pronta para integração futura com API.

    Exemplo esperado no futuro:
    1) Ler arquivo local
    2) Enviar para endpoint seguro
    3) Receber PNG restaurado e metadados (DPI)
    4) Retornar PIL.Image
    """
    raise RemoteRestorationNotImplementedError(
        "Integração de API ainda não implementada. Use restorer_local.restore_scanned_page()."
    )
