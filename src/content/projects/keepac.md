---
title: Keepac
description: Read, edit and query changelogs from your terminal
startedAt: 2024-01-01
github: https://github.com/NiclasvanEyk/keepac
---

**Keep** **a** **C**hangelog. Heh.

> TODO: Find a good introduction!

It alleviates us from thinking about files.
**Keepac** attempts to do the same.
Its binary, `changelog`, makes all commands feel natural:


> TODO: Document, that these are actually shortcuts for editing the `README.md` according to the keep a changelog guidelines.

Want to document a new feature?

    changeog add "A shiny new feature"

Want to remove an existing one?

    changeog rm "A boring old feature"

Want to see what changes are included in the upcoming release?

    changelog show next

Want to actually release?

    changelog release --minor

All of these can be run from anywhere in your project.
We search upwards the directory tree, until a `CHANGELOG.md` is found.
Again, similar to how Git does it when you run `git commit` or `git status`.

There is more to explore, like creating an empty `CHANGELOG.md`, viewing a summary of release notes from multiple releases, or a search feature, which automatically displays the version for query results.
Try replicating that via `grep`!

The installation (or even compiling from scratch) is simple and documented [on GitHub](http://github.com/NiclasvanEyk/keepac).
Run `changelog --help` or `changelog SUBCOMMAND --help` for all the details.
