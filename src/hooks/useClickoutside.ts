import { useEffect } from "react";

export default function useClickOutside<
  Ref extends React.RefObject<HTMLElement>,
>(refs: Ref | Ref[], handler: (() => void) | undefined) {
  function handleDocumentClick(event: MouseEvent | TouchEvent) {
    const refsArray = Array.isArray(refs) ? refs : [refs];
    if (handler) {
      const containsEvent = refsArray.some((ref) => {
        return ref.current && ref.current.contains(event.target as HTMLElement);
      });

      if (!containsEvent) {
        handler();
      }
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);
}
