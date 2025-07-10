import { useCallback, useEffect, useState } from "react";

interface MousePosition {
  x: number;
  y: number;
  isOverElement: boolean;
}

export default function useMousePosition<T extends HTMLElement>(
  elementRef?: React.RefObject<T>,
): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    isOverElement: false,
  });

  const checkIsOverElement = useCallback((event: MouseEvent, element?: T) => {
    if (!element) {
      return false;
    }

    const rect = element.getBoundingClientRect();

    return (
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom
    );
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const isOverElement = elementRef?.current
        ? checkIsOverElement(event, elementRef.current)
        : false;
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
        isOverElement,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return mousePosition;
}
