import { useEffect, useState } from "react";

export function useAsyncInitialize<T>(
  func: () => Promise<T>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deps: any[] = [],
  delay: number = 0,
) {
  const [state, setState] = useState<T | undefined>();
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined;
    (async () => {
      if (delay > 0) {
        await new Promise((resolve) => {
          timeoutId = setTimeout(resolve, delay);
        });
      }

      try {
        setState(await func());
      } catch (error) {
        console.error("Error initializing:", error);
      }
    })();
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, deps);

  return state;
}
