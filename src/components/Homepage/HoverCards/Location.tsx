import { HoverableText } from './HoverableText';

export function Location() {
  return <HoverableText text="Osnabrück" width="w-[400px] h-[400px]" padding={false}>
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1249837.687188823!2d6.7370578190791415!3d52.27808196068952!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b9e598697b5d4d%3A0x426cf7763005c60!2sOsnabr%C3%BCck!5e0!3m2!1sde!2sde!4v1707504274368!5m2!1sde!2sde"
      width="100%"
      height="100%"
      className="border-none dark:invert dark:grayscale"
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </HoverableText>;
}
