import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

import { getIcon } from "@/layouts/MainLayout/components/GamesMenuSidebar/utils";
import { cn } from "@/lib/utils";
import { mainRoutes } from "@/routes/routes";

interface Props {
  className?: string;
}

const GamesMenuSidebar: React.FC<Props> = () => {
  const { pathname } = useLocation();

  const { t } = useTranslation(`DATA_MENU_SIDEBAR`);
  return (
    <div className="w-[258px] flex-shrink-0 border-r p-6 max-lg:hidden">
      {mainRoutes.map(({ path, title }) => {
        const isActive = path === pathname;
        return (
          <Link
            key={title}
            to={path}
            className={cn(
              "flex items-center gap-2 rounded-4 p-3 text-menu-item hover:bg-accent",
              isActive && "bg-accent",
            )}
          >
            {getIcon(path)}

            {t(`main`)}
          </Link>
        );
      })}
    </div>
  );
};

export default GamesMenuSidebar;
