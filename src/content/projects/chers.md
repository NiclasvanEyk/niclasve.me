---
title: "Chers"
description: Chess for the terminal and web.
startedAt: 2023-09-20
github: https://github.com/NiclasvanEyk/chers
website: https://chers.niclasve.me
---

This project primarily originated from the urge to play with technologies.
I like to play chess from time to time, so why not recreate it from scratch?
At first, it was an excuse to learn the Rust programming language.
Then it turned more into an excuse to learn more about rendering in a terminal environment.
Turns out you can compile Rust to WebAssembly, so the logical next step was to do just that so everything can run in the browser.
That however, required to also build a web UI in addition to the terminal one.

The implementation is definitely not complete though.
While all movement patterns, detecting checks and check mates, and even some more exotic rules like en passant do work, castling and e.g. proper movement clocks do not.
I'd also like to implement peer to peer matches via sockets.
