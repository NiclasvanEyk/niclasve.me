import * as HoverCard from '@radix-ui/react-hover-card';
import type { ReactNode } from 'react';

interface Props {
  text: string;
  width: string;
  children: ReactNode;
  padding?: boolean;
}

export function HoverableText({ text, children, width, padding }: Props) {
  const animations = "data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade data-[state=open]:transition-all";
  let applyPadding = padding === undefined ? true : padding;

  return <HoverCard.Root openDelay={0.25}>
    <HoverCard.Trigger asChild>
      <a className="underline cursor-help">{text}</a>
    </HoverCard.Trigger>

    <HoverCard.Portal>
      <HoverCard.Content
        side="top"
        className={`bg-zinc-50 overflow-hidden dark:bg-zinc-800 rounded-md ${applyPadding ? 'p-5' : ''} ${width} ${animations} shadow-md`}
      >
        {children}
      </HoverCard.Content>
    </HoverCard.Portal>
  </HoverCard.Root>;
}
