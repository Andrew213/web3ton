import React, { forwardRef, useEffect, useState } from "react";

import { cn } from "@/lib/utils";

interface Props {
  onClick: () => void;
  isActive?: boolean;
  className?: string;
}

const BurgerButton = forwardRef<HTMLButtonElement, Props>(
  ({ onClick, className, isActive }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
      if (isActive !== undefined) {
        setIsOpen(isActive);
      }
    }, [isActive]);
    const genericHamburgerLine = `h-[2px] w-[32px] rounded-full bg-foreground transition ease transform duration-300`;
    return (
      <button
        ref={ref}
        type="button"
        aria-label="open menu"
        className={cn(
          "group flex h-12 w-12 flex-col items-center justify-center gap-2",
          className,
        )}
        onClick={() => {
          setIsOpen(!isOpen);
          onClick();
        }}
      >
        <div
          className={`${genericHamburgerLine} ${
            isOpen
              ? "translate-y-2 rotate-45 group-hover:opacity-100"
              : "group-hover:opacity-100"
          }`}
        />
        <div
          className={`${genericHamburgerLine} ${isOpen ? "opacity-0" : "group-hover:opacity-100"}`}
        />
        <div
          className={`${genericHamburgerLine} ${
            isOpen
              ? "-translate-y-3 -rotate-45 group-hover:opacity-100"
              : "group-hover:opacity-100"
          }`}
        />
      </button>
    );
  },
);

BurgerButton.displayName = "BurgerButton";

export default BurgerButton;
