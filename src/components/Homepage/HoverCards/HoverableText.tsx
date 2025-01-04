import { HovercardProvider, Hovercard, HovercardAnchor } from "@ariakit/react";
import type { ReactNode } from 'react';

interface Props {
  text: string;
  width: string;
  children: ReactNode;
  padding?: boolean;
}

export function HoverableText({ text, children, width, padding }: Props) {
  let applyPadding = padding === undefined ? true : padding;

  return <HovercardProvider timeout={250}>
    <HovercardAnchor className="underline cursor-help">
      {text}
    </HovercardAnchor>

    <Hovercard className={`data-[state=inactive]:hidden bg-zinc-50 overflow-hidden dark:bg-zinc-800 rounded-md ${applyPadding ? 'p-5' : ''} ${width} shadow-md z-50`}>
      {children}
    </Hovercard>
  </HovercardProvider>;
}
