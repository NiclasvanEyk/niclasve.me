I enjoy improving my workflow.
Inspired by [others](https://uses.tech), I want to share the tools I use on a daily basis.

## Terminal

I used to be a happy [Ghostty](https://ghostty.org) user, but since I got invited to the [Rex Beta by Superlogical](https://superlogical.com/rex) I switched and haven't looked back.

### Shell

- `fish` is my shell due to it providing nice features such as autocomplete, syntax highlighting, all why keeping a relatively quick startup time and being easy to configure.
- `starship` is a nice prompt with good defaults. I use the [`pure` present](https://starship.rs/presets/pure-preset#pure-preset).
- `atuin` replaces my CTRL+R with a _way_ more intuitive shell history.
- `fzf` replaces my CTRL+T with a more useful picker UI.
- `bat` replaces `cat`, though with a pretty mininmal configuration that only adds syntax highlighting.
- `zoxide` replaces `cd` and I would not want to navigate my directory tree without it.
- `ripgrep` replaces `grep` for me, if not for the sole reason that it honors `.gitignore` by default.
- `eza` replaces `ls` for the nice colors + icons, and I also like its `--tree` option also replaces `tree`.

### TUIs

- `helix` is my code editor because it feels snappier than all my Neovim configs.
- `lazygit` is a really nice git ui once you get the hang of the keyboard shortcuts.
- `opencode` allows agent of choice right now. 
  I also really respect them for democratizing access to LLMs through their free usage tier and Go plan. 

### Package Management

- `mise` is the central piece of the setup.
  It manages apps, packages, dotfiles, MacOS settings, and auto-activates my Python `.venv/`s.
  _Every_ tool listed here is installed using mise.
  Setting up a new machine is a oneliner.
- `uv` made Python dependency management fast and intuitive.
- `aube` has the best UX + safety features for the JavaScript ecosystem.

### LSPs

- `typos` and `typos-lsp` prevent common spelling errors.
- `marksman` autocompletes section links, wiki-style links, and provides document symbols.
- `tombi` is the best TOML one, though sometimes annoying with the default configuration.
  Great first-party integration for `pyproject.toml` (plus `uv` goodies) and `Cargo.toml` files though!
- `ruff` & `ty` for Python.
- `yaml-language-server` for YAML.

### General Utilities

- 1Password and `op` for password & SSH key management.
- `gh` for letting agents drafting up PRs on my behalf.
- `gum` has lots of nice little tools like spinners, choice UIs, that make it easy to write interactive shell scripts.
