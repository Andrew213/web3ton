import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import { useTranslation } from "react-i18next";

import { Button, ButtonProps, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-end", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  ...props
}: ButtonProps & { isActive: boolean }) => (
  <Button
    variant={isActive ? "outline" : "ghost"}
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
      }),
      className,
    )}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof Button>) => {
  const { t } = useTranslation("translation");
  return (
    <Button
      size="default"
      variant="ghost"
      className={cn("gap-1 pl-2.5 text-foreground", className)}
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
      <span>{t`previous`}</span>
    </Button>
  );
};
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof Button>) => {
  const { t } = useTranslation("translation");

  return (
    <Button
      variant="ghost"
      // aria-label="Go to next page"
      size="default"
      className={cn("gap-1 pr-2.5 text-foreground", className)}
      {...props}
    >
      <span>{t`next`}</span>
      <ChevronRight className="h-4 w-4" />
    </Button>
  );
};
PaginationNext.displayName = "PaginationNext";

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
