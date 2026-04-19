import tkinter as tk
from tkinter import filedialog, messagebox, ttk
from pathlib import Path
from PIL import Image, ImageTk

from restorer_local import RestorationConfig, restore_scanned_page


class ManualRestorerApp:
    def __init__(self, root: tk.Tk) -> None:
        self.root = root
        self.root.title("Restaurador de Páginas de Manuais")
        self.root.geometry("1200x760")

        self.input_path: Path | None = None
        self.original_image: Image.Image | None = None
        self.restored_image: Image.Image | None = None

        self._original_preview_ref = None
        self._restored_preview_ref = None

        self.intensity_var = tk.StringVar(value="média")
        self.remove_dark_borders_var = tk.BooleanVar(value=True)
        self.uniform_background_var = tk.BooleanVar(value=True)

        self._build_ui()

    def _build_ui(self) -> None:
        container = ttk.Frame(self.root, padding=12)
        container.pack(fill="both", expand=True)

        controls = ttk.LabelFrame(container, text="Controles", padding=10)
        controls.pack(fill="x")

        ttk.Button(controls, text="Escolher imagem", command=self.choose_image).grid(row=0, column=0, padx=6, pady=6)
        ttk.Button(controls, text="Processar", command=self.process_image).grid(row=0, column=1, padx=6, pady=6)
        ttk.Button(controls, text="Salvar PNG", command=self.save_image).grid(row=0, column=2, padx=6, pady=6)

        ttk.Label(controls, text="Intensidade:").grid(row=0, column=3, padx=(20, 4), sticky="e")
        intensity_combo = ttk.Combobox(
            controls,
            textvariable=self.intensity_var,
            values=["leve", "média", "forte"],
            state="readonly",
            width=10,
        )
        intensity_combo.grid(row=0, column=4, padx=4)

        ttk.Checkbutton(
            controls,
            text="Remover borda escura",
            variable=self.remove_dark_borders_var,
        ).grid(row=0, column=5, padx=(20, 8))

        ttk.Checkbutton(
            controls,
            text="Uniformizar fundo",
            variable=self.uniform_background_var,
        ).grid(row=0, column=6, padx=8)

        previews = ttk.Frame(container)
        previews.pack(fill="both", expand=True, pady=(12, 0))

        original_box = ttk.LabelFrame(previews, text="Preview Original", padding=8)
        original_box.pack(side="left", fill="both", expand=True, padx=(0, 6))

        restored_box = ttk.LabelFrame(previews, text="Preview Restaurado", padding=8)
        restored_box.pack(side="left", fill="both", expand=True, padx=(6, 0))

        self.original_label = ttk.Label(original_box, anchor="center")
        self.original_label.pack(fill="both", expand=True)

        self.restored_label = ttk.Label(restored_box, anchor="center")
        self.restored_label.pack(fill="both", expand=True)

        self.status_var = tk.StringVar(value="Selecione uma imagem para começar.")
        ttk.Label(container, textvariable=self.status_var, relief="sunken", anchor="w").pack(fill="x", pady=(8, 0))

    def choose_image(self) -> None:
        file_path = filedialog.askopenfilename(
            title="Escolher imagem escaneada",
            filetypes=[("Imagens", "*.png *.jpg *.jpeg")],
        )
        if not file_path:
            return

        self.input_path = Path(file_path)
        try:
            self.original_image = Image.open(self.input_path).convert("RGB")
            self.restored_image = None
            self._set_preview(self.original_image, self.original_label, is_original=True)
            self.restored_label.configure(image="", text="")
            self.status_var.set(f"Imagem carregada: {self.input_path.name}")
        except Exception as exc:
            messagebox.showerror("Erro", f"Não foi possível abrir a imagem.\n\n{exc}")

    def process_image(self) -> None:
        if self.original_image is None or self.input_path is None:
            messagebox.showwarning("Aviso", "Escolha uma imagem primeiro.")
            return

        config = RestorationConfig(
            intensity=self.intensity_var.get(),
            remove_dark_borders=self.remove_dark_borders_var.get(),
            uniform_background=self.uniform_background_var.get(),
        )

        try:
            self.restored_image = restore_scanned_page(str(self.input_path), config)
            self._set_preview(self.restored_image, self.restored_label, is_original=False)
            self.status_var.set("Processamento concluído. Pronto para salvar.")
        except Exception as exc:
            messagebox.showerror("Erro no processamento", str(exc))

    def save_image(self) -> None:
        if self.restored_image is None:
            messagebox.showwarning("Aviso", "Processe uma imagem antes de salvar.")
            return

        file_path = filedialog.asksaveasfilename(
            title="Salvar PNG restaurado",
            defaultextension=".png",
            filetypes=[("PNG", "*.png")],
            initialfile="pagina_restaurada_15x21_300dpi.png",
        )
        if not file_path:
            return

        try:
            self.restored_image.save(file_path, format="PNG", dpi=(300, 300), optimize=True)
            self.status_var.set(f"Arquivo salvo: {Path(file_path).name}")
            messagebox.showinfo("Sucesso", "Imagem salva com sucesso em PNG (300 DPI).")
        except Exception as exc:
            messagebox.showerror("Erro", f"Falha ao salvar a imagem.\n\n{exc}")

    def _set_preview(self, image: Image.Image, label: ttk.Label, is_original: bool) -> None:
        preview = image.copy()
        preview.thumbnail((540, 640), Image.Resampling.LANCZOS)
        tk_img = ImageTk.PhotoImage(preview)
        label.configure(image=tk_img, text="")

        if is_original:
            self._original_preview_ref = tk_img
        else:
            self._restored_preview_ref = tk_img


def main() -> None:
    root = tk.Tk()
    app = ManualRestorerApp(root)
    root.mainloop()


if __name__ == "__main__":
    main()
