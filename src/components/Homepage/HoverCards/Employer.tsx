import logoLight from "./employer-logo.light.svg";
import logoDark from "./employer-logo.dark.svg";
import { HoverableText } from './HoverableText';

export function Employer() {
  return <HoverableText width="w-[500px]" text="Team Internet">
    <div className="flex flex-col gap-10">
      <picture>
        <source srcSet={logoLight.src} media="(prefers-color-scheme: light)" />
        <img src={logoDark.src} />
      </picture>

      <blockquote className="text-sm border-l pl-2 italic break-words">
        Team Internet Group PLC (formerly named CentralNic Group PLC) is a British multinational internet services holding company headquartered in London, United Kingdom.
        Its subsidiaries provide services categorized in two segments: Online Marketing and Online Presence.
        The Online Marketing segment offers services and products in digital advertising, domain monetization, traffic commerce and product comparison;
        the Online Presence segment provide domain name registry and registrar services, in addition to associated products and services, including web hosting, brand management, and domain parking.
      </blockquote>

      <div className="flex flex-row justify-between items-center">
        <a href="https://en.wikipedia.org/wiki/Team_Internet" className="underline">Wikipedia</a>
        <a href="https://teaminternet.com" className="underline">Homepage</a>
      </div>
    </div>
  </HoverableText>;
}
