/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import * as React from "react";

import { cn } from "@/lib/utils";

const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_ICON = "3rem";

interface Props {
  side?: "left" | "right";
  open: boolean;
  collapsible?: "offcanvas" | "icon" | "none";
  width?: string;
}

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & Props
>(
  (
    {
      side = "left",
      collapsible = "offcanvas",
      className,
      open,
      children,
      width,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        style={
          {
            "--sidebar-width": width || SIDEBAR_WIDTH,
            "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
          } as React.CSSProperties
        }
      >
        <div
          ref={ref}
          className={cn(
            "group peer absolute bottom-0 left-0 text-sidebar-foreground",
            side === "right" && "right-0",
          )}
          data-collapsible={open ? "" : collapsible}
          data-side={side}
        >
          <div
            className={cn(
              "absolute inset-y-0 top-0 z-10 flex h-[calc(100svh-64px)] w-[--sidebar-width] transition-[left,right,width] duration-200 ease-linear",
              side === "left"
                ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
                : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
              className,
            )}
            {...props}
          >
            <div
              data-sidebar="sidebar"
              className="flex h-full w-full flex-col bg-background group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow"
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  },
);
Sidebar.displayName = "Sidebar";

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="content"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className,
      )}
      {...props}
    />
  );
});
SidebarContent.displayName = "SidebarContent";

const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu"
    className={cn("flex w-full min-w-0 flex-col gap-1", className)}
    {...props}
  />
));
SidebarMenu.displayName = "SidebarMenu";

const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    data-sidebar="menu-item"
    className={cn("group/menu-item relative", className)}
    {...props}
  />
));
SidebarMenuItem.displayName = "SidebarMenuItem";

export { Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem };
