import { useMediaQuery } from "react-responsive";
import resolveConfig from "tailwindcss/resolveConfig";
import type { Config } from "tailwindcss/types/config";

import tailwindConfig from "@/../tailwind.config";

const fullConfig = resolveConfig(tailwindConfig as unknown as Config);

const breakpoints = fullConfig?.theme?.screens || {
  lg: "1195px",
  md: "835px",
  sm: "770px",
};

export function useBreakpoint<K extends string>(breakpointKey: K) {
  const breakpointValue =
    breakpoints[breakpointKey as keyof typeof breakpoints];
  const bool = useMediaQuery({
    query: `(min-width: ${breakpointValue})`,
  });
  const capitalizedKey =
    breakpointKey[0].toUpperCase() + breakpointKey.substring(1);

  type KeyAbove = `isAbove${Capitalize<K>}`;
  type KeyBelow = `isBelow${Capitalize<K>}`;

  return {
    [breakpointKey]: Number(String(breakpointValue).replace(/[^0-9]/g, "")),
    [`isAbove${capitalizedKey}`]: bool,
    [`isBelow${capitalizedKey}`]: !bool,
  } as Record<K, number> & Record<KeyAbove | KeyBelow, boolean>;
}
