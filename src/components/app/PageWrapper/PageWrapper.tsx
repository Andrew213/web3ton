import { ArrowLeft } from "lucide-react";
import React, { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { menuRoutes } from "@/routes/routes";

interface IPageWrapperProps {
  children: ReactNode;
  rightSection?: ReactNode;
  title: string;
}
const PageWrapper: React.FC<IPageWrapperProps> = ({
  children,
  title,
  rightSection,
}) => {
  const { pathname } = useLocation();

  return (
    <div className="mx-auto flex h-full w-full max-w-308 flex-col overflow-y-auto px-4 py-6">
      <div
        className={cn(
          "flex justify-between max-sm:gap-5",
          pathname !== menuRoutes.leaderboard && "max-sm:flex-col",
        )}
      >
        <div className="flex items-center gap-3">
          <Link to="/">
            <Button variant="outline" className="rounded-3.5 p-3">
              <ArrowLeft className="size-3" />
            </Button>
          </Link>
          <h1 className="text text-h3 font-600 sm:text-h3 lg:text-h2">
            {title}
          </h1>
        </div>
        {rightSection}
      </div>
      {children}
    </div>
  );
};

export default PageWrapper;
