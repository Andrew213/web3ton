import { useUnit } from "effector-react";
import { PropsWithChildren, useEffect, useRef, useState } from "react";

import { useBreakpoint } from "@/hooks/useBreakpoint";
import useMousePosition from "@/hooks/useMousePosition";
import { $cardPosition } from "@/pages/Main/components/Card/model";

interface Props extends PropsWithChildren {
  className?: string;
}

interface AnimatedPosition {
  x: number;
  y: number;
}

function easeOutQuad(t: number): number {
  return t * (2 - t);
}

export const SpotlightEffect: React.FC<Props> = ({ children }) => {
  const divRef = useRef<HTMLDivElement>(null);

  const [isFocused, setIsFocused] = useState(false);

  const gradientRef = useRef<HTMLDivElement>(null);

  const innerRef = useRef<HTMLDivElement>(null);

  const { isBelowLg } = useBreakpoint("lg");

  const { x: mouseX, y: mouseY, isOverElement } = useMousePosition(innerRef);

  const [cardPosition] = useUnit([$cardPosition]);

  const [animatedPosition, setAnimatedPosition] = useState<AnimatedPosition>({
    x: 0,
    y: 0,
  });
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!divRef.current || !gradientRef.current || isFocused) {
      return;
    }

    const targetX = isOverElement ? mouseX : divRef.current.clientWidth / 2;
    const targetY = isOverElement ? mouseY : divRef.current.clientHeight / 2;
    const speed = isOverElement ? 1 : 0.05;

    const animate = () => {
      const diffX = targetX - animatedPosition.x;
      const diffY = targetY - animatedPosition.y;

      setAnimatedPosition((prevPosition) => ({
        x: isOverElement
          ? mouseX - 250
          : prevPosition.x + diffX * easeOutQuad(speed),
        y: isOverElement ? mouseY : prevPosition.y + diffY * easeOutQuad(speed),
      }));
      animationRef.current = requestAnimationFrame(animate);
    };

    if (
      !isBelowLg &&
      animationRef.current === null &&
      (Math.abs(targetX - animatedPosition.x) >= 1 ||
        Math.abs(targetY - animatedPosition.y) >= 1)
    ) {
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [mouseX, mouseY, isOverElement, isFocused, animatedPosition, isBelowLg]);

  useEffect(() => {
    if (!divRef.current || !gradientRef.current || isFocused) return;

    if (isBelowLg) {
      gradientRef.current.style.backgroundImage = `radial-gradient(
        300px circle at ${cardPosition.x}% ${cardPosition.y}%,
        transparent,
        var(--background-main)
        )`;
    } else {
      gradientRef.current.style.backgroundImage = `radial-gradient(
        500px circle at ${animatedPosition.x}px ${animatedPosition.y}px,
        transparent -100%,
        var(--background-main)
        )`;
    }
  }, [animatedPosition, isFocused, isBelowLg, cardPosition]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <>
      <div
        ref={divRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="pointer-events-none absolute -inset-0 z-0 brightness-100 transition duration-300"
      />
      <div
        ref={gradientRef}
        className="pointer-events-none absolute -inset-0 z-0 brightness-100 transition duration-300"
      />
      <div ref={innerRef} id="spotlight" className="h-full">
        {children}
      </div>
    </>
  );
};

export default SpotlightEffect;
