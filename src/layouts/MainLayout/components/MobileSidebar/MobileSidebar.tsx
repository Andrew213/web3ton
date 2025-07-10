import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { useUnit } from "effector-react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { Link, useLocation } from "react-router-dom";

import {
  IconChevron,
  IconHistory,
  IconLogout,
  IconTheme,
} from "@/assets/icons";
import { LevelBadge } from "@/components/app/LevelBage/LevelBadge";
import TelegramBadge from "@/components/app/TelegramLinkBadge/TelegramBadge";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/core/providers/ThemeProviderContext";
import useClickOutside from "@/hooks/useClickoutside";
import { getIcon } from "@/layouts/MainLayout/components/GamesMenuSidebar/utils";
import LanguageModal from "@/layouts/MainLayout/components/MobileSidebar/components/LanguageModal";
import { cn } from "@/lib/utils";
import {
  $isUserExperienceLoading,
  $userExperience,
} from "@/pages/Profile/components/model";
import { mainRoutes, menuRoutes } from "@/routes/routes";
import { cropAddress } from "@/utils/cropAddress";

interface Props {
  open: boolean;
  onClose?: () => void;
  preventCloseRefs: React.RefObject<HTMLElement>[];
}

const MobileSidebar: React.FC<Props> = ({
  open,
  onClose,
  preventCloseRefs,
}) => {
  const [userExperience] = useUnit([$userExperience, $isUserExperienceLoading]);

  const { pathname } = useLocation();

  const userFriendlyAddress = useTonAddress();

  const [tonConnectUI] = useTonConnectUI();

  const [theme, setTheme] = useTheme();

  const ref = useRef<HTMLDivElement>(null);

  const modalRef = useRef<HTMLDivElement>(null);

  const userLevel = userExperience?.level || 0;

  useClickOutside([ref, modalRef, ...preventCloseRefs], () => {
    onClose?.();
  });

  const { t } = useTranslation(`DATA_MOBILE_SIDEBAR`);
  const { t: tMenu } = useTranslation(`DATA_MENU_SIDEBAR`);

  const matches = useMediaQuery({ query: "(max-width: 600px)" });
  return (
    <>
      <div
        className={cn(
          "fixed inset-0 -z-10 bg-[#030712] bg-opacity-50 transition-opacity duration-300",
          open ? "opacity-60" : "pointer-events-none opacity-0", // Add pointer-events-none when closed
        )}
      />
      <Sidebar
        ref={ref}
        width={matches ? "100%" : "390px"}
        className="z-50 hidden border-l max-lg:flex"
        side="right"
        open={open}
      >
        <SidebarContent className="py-6">
          {!tonConnectUI.connected && (
            <div className="mb-6 hidden px-4 max-sm:block">
              <button
                type="button"
                onClick={() => tonConnectUI.openModal()}
                className="w-full rounded-[14px] bg-primary py-2.5 font-500 text-text sm:hidden"
              >
                {t`buttonConnect`}
              </button>
            </div>
          )}
          <SidebarMenu>
            <div className="mb-5 border-b pb-5">
              <p className="mb-3 px-4 text-th font-th">{t`titleGames`}</p>
              {mainRoutes.map(({ path, title }) => {
                const isActive = path === pathname;
                return (
                  <SidebarMenuItem key={title}>
                    <Link
                      to={path}
                      className={cn(
                        "flex items-center gap-2 p-4 font-500 text-menu-item hover:bg-input",
                        isActive && "bg-input",
                      )}
                    >
                      {getIcon(path)}
                      {tMenu`main`}
                    </Link>
                  </SidebarMenuItem>
                );
              })}
            </div>
            <div className="shadow-md">
              <p className="mb-5 px-4 text-th font-th">{t`titleSettings`}</p>

              <ul className="text-foreground">
                {tonConnectUI.connected && (
                  <li className="transition-color mb-3 duration-200">
                    <Link to={`/profile/${userFriendlyAddress}`}>
                      <button
                        type="button"
                        onClick={() => onClose?.()}
                        className="flex w-full cursor-pointer items-center gap-3 px-4 py-1.5 text-th font-th"
                      >
                        <LevelBadge level={userLevel} />

                        <div className="flex flex-col">
                          <span className="text-start text-3 font-500 text-muted-foreground">
                            {t`itemProfile`}
                          </span>
                          {cropAddress(userFriendlyAddress)}
                        </div>
                        <IconChevron className="ml-auto size-6 -rotate-90" />
                      </button>
                    </Link>
                  </li>
                )}
                {tonConnectUI.connected && (
                  <li className="transition-color border-b border-t px-4 py-4.5">
                    <Link
                      to={menuRoutes.history}
                      className="flex items-center gap-2"
                      onClick={() => {
                        onClose?.();
                      }}
                    >
                      <IconHistory className="size-4" />
                      {t`itemHistory`}
                      <IconChevron className="ml-auto size-6 -rotate-90" />
                    </Link>
                  </li>
                )}
                <li className="transition-color border-b px-4 py-4.5">
                  <LanguageModal ref={modalRef} />
                </li>
                <li className="transition-color flex cursor-pointer items-center gap-2 border-b px-4 py-4.5">
                  <IconTheme className="size-4" />
                  {t`itemTheme`}
                  <Switch
                    className="ml-auto"
                    checked={theme === "dark"}
                    onCheckedChange={(isEnabled) => {
                      if (setTheme) {
                        setTheme(isEnabled ? "dark" : "light");
                      }
                    }}
                  />
                </li>
                {tonConnectUI.connected && (
                  <li
                    aria-hidden
                    onClick={() => {
                      tonConnectUI.disconnect();
                    }}
                    className="transition-color flex cursor-pointer items-center gap-2 border-b px-4 py-4.5"
                  >
                    <IconLogout className="size-4" />
                    {t`itemLogout`}
                  </li>
                )}
              </ul>
            </div>
            <TelegramBadge isMobile />
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
    </>
  );
};

export default MobileSidebar;
