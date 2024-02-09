import * as HoverCard from '@radix-ui/react-hover-card';
import type { ReactNode } from 'react';

interface Props {
  text: string;
  children: ReactNode;
}

export function HoverableText({ text, children }: Props) {
  const animations = "data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade data-[state=open]:transition-all";
  const shadows = "shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]";

  return <HoverCard.Root openDelay={0.25} defaultOpen={true} open={true}>
    {/* <HoverCard.Trigger asChild> */}
    {/*   <a className="underline">{text}</a> */}
    {/* </HoverCard.Trigger> */}

    <HoverCard.Portal>
      <HoverCard.Content
        className={`bg-zinc-100 dark:bg-zinc-800 w-[300px] rounded-md p-5 ${animations} ${shadows}`}
        sideOffset={5}
      >
        {children}
      </HoverCard.Content>
    </HoverCard.Portal>
  </HoverCard.Root>;
}
