# Restaurador Local de Páginas Escaneadas (Tkinter)

Aplicativo desktop em Python para **restauração conservadora** de páginas de manuais antigos.

> Objetivo: melhorar legibilidade e impressão sem alterar conteúdo técnico.

## Funcionalidades

- Entrada local: PNG, JPG, JPEG
- Saída: PNG restaurado
- Tamanho final fixo: **15 cm x 21 cm**
- Resolução: **300 DPI**
- Controles:
  - Intensidade: `leve`, `média`, `forte`
  - Remover borda escura: `sim/não`
  - Uniformizar fundo: `sim/não`
- Interface com:
  - botão escolher imagem
  - botão processar
  - preview original
  - preview restaurado
  - botão salvar

## Estratégia de restauração (conservadora)

Pipeline local (`restorer_local.py`):

1. redução leve de ruído e pequenas manchas;
2. atenuação opcional de bordas escuras de scanner;
3. uniformização opcional de fundo + correção suave de sombras;
4. nitidez leve (unsharp mask moderada);
5. centralização em canvas fixo 15x21 cm @ 300 DPI, sem distorção.

A lógica prioriza não mexer em caracteres pequenos, números e diagramas. Se houver dúvida, preserva o original ao máximo.

## Requisitos

- Python 3.10+
- Windows (também funciona em Linux/macOS com Tk instalado)

## Como rodar localmente (Windows)

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

## Empacotar em .exe (PyInstaller)

1. Instale o PyInstaller:

```bash
pip install pyinstaller
```

2. Gere o executável de janela (sem console):

```bash
pyinstaller --noconfirm --onefile --windowed --name RestorerManual main.py
```

3. O `.exe` será criado em:

- `dist\RestorerManual.exe`

### Dica opcional

Para incluir ícone:

```bash
pyinstaller --noconfirm --onefile --windowed --name RestorerManual --icon app.ico main.py
```

## Estrutura

- `main.py` -> interface Tkinter
- `restorer_local.py` -> restauração local com Pillow/OpenCV/Numpy
- `restorer_api.py` -> stub para integração futura com API
- `requirements.txt`
- `README.md`

## Observações importantes

- Este app **não usa IA generativa** para "inventar" partes faltantes.
- Não redesenha elementos; apenas aplica ajustes clássicos de imagem de forma conservadora.
- Sempre revise visualmente a saída em documentos muito degradados.
