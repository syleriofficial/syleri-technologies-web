import Image from "next/image";

/**
 * Full "Syleri Technologies" lockup (ribbon mark + wordmark, no tagline).
 * Both light- and dark-background renditions ship from the approved brand
 * artwork; CSS (not JS) picks the right one via the `dark:` variant, so both
 * render on the server and there is no flash. See ThemeToggle for the same
 * pattern.
 */
export function Logo({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <>
      <Image
        src="/brand/syleri-technologies-logo-light.png"
        alt="Syleri Technologies"
        width={893}
        height={386}
        priority={priority}
        className={`block w-auto dark:hidden ${className}`}
      />
      <Image
        src="/brand/syleri-technologies-logo-dark.png"
        alt="Syleri Technologies"
        width={697}
        height={282}
        priority={priority}
        className={`hidden w-auto dark:block ${className}`}
      />
    </>
  );
}

/**
 * Symbol-only ribbon mark ("S"), for compact/mobile contexts. The mark's own
 * blue gradient doesn't change between themes (only the wordmark's ink color
 * does), so the same artwork is used on both light and dark backgrounds.
 */
export function LogoSymbol({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src="/brand/syleri-symbol-light.png"
      alt="Syleri Technologies"
      width={235}
      height={386}
      priority={priority}
      className={`w-auto ${className}`}
    />
  );
}
