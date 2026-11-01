I enjoy improving my workflow.
Inspired by [others](https://uses.tech), I want to share the tools I use on a daily basis.

## Terminal

I used to be a happy [Ghostty](https://ghostty.org) user, but since I got invited to the [Rex Beta by Superlogical](https://superlogical.com/rex) I switched and haven't looked back.

### Shell

- [`fish`](https://fishshell.com) is my shell due to it providing nice features such as autocomplete, syntax highlighting, all why keeping a relatively quick startup time and being easy to configure.
- [`starship`](https://starship.rs) is a nice prompt with good defaults. I use the [`pure` present](https://starship.rs/presets/pure-preset#pure-preset).
- [`atuin`](https://github.com/atuinsh/atuin) replaces my CTRL+R with a _way_ more intuitive shell history.
- [`fzf`](https://github.com/junegunn/fzf) replaces my CTRL+T with a more useful picker UI.
- [`bat`](https://github.com/sharkdp/bat) replaces `cat`, though with a pretty mininmal configuration that only adds syntax highlighting.
- [`zoxide`](https://github.com/ajeetdsouza/zoxide) replaces `cd` and I would not want to navigate my directory tree without it.
- [`ripgrep`](https://github.com/BurntSushi/ripgrep) replaces `grep` for me, if not for the sole reason that it honors `.gitignore` by default.
- [`eza`](https://github.com/eza-community/eza) replaces `ls` for the nice colors + icons, and I also like its `--tree` option also replaces `tree`.

### TUIs

- [`helix`](https://helix-editor.com) is my code editor because it feels snappier than all my Neovim configs.
- [`lazygit`](https://github.com/jesseduffield/lazygit) is a really nice git ui once you get the hang of the keyboard shortcuts.
- [`opencode`](https://opencode.ai) allows agent of choice right now. 
  I also really respect them for democratizing access to LLMs through their free usage tier and Go plan. 

### Package Management

- [`mise`](https://github.com/jdx/mise) is the central piece of the setup.
  It manages apps, packages, dotfiles, MacOS settings, and auto-activates my Python `.venv/`s.
  _Every_ tool listed here is installed using mise.
  Setting up a new machine is a oneliner.
- [`uv`](https://github.com/astral-sh/uv) made Python dependency management fast and intuitive.
- [`aube`](https://github.com/aubepkg/aube) has the best UX + safety features for the JavaScript ecosystem.

### LSPs

- [`typos`](https://github.com/crate-ci/typos) and [`typos-lsp`](https://github.com/tekumara/typos-lsp) prevent common spelling errors.
- [`marksman`](https://github.com/artempyanykh/marksman) autocompletes section links, wiki-style links, and provides document symbols.
- [`tombi`](https://github.com/tombi-toml/tombi) is the best TOML one, though sometimes annoying with the default configuration.
  Great first-party integration for `pyproject.toml` (plus `uv` goodies) and `Cargo.toml` files though!
- [`ruff`](https://github.com/astral-sh/ruff) & [`ty`](https://github.com/astral-sh/ty) for Python.
- [`yaml-language-server`](https://github.com/redhat-developer/yaml-language-server) for YAML.

### General Utilities

- 1Password and [`op`](https://developer.1password.com/docs/cli/) for password & SSH key management.
- [`gh`](https://github.com/cli/cli) for letting agents drafting up PRs on my behalf.
- [`gum`](https://github.com/charmbracelet/gum) has lots of nice little tools like spinners, choice UIs, that make it easy to write interactive shell scripts.
