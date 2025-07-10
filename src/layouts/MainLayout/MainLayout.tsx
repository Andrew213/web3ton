import { useUnit } from "effector-react";
import { Outlet } from "react-router-dom";

import { HEADER_HEIGHT } from "@/components/app/Header/constants";
import TelegramBadge from "@/components/app/TelegramLinkBadge/TelegramBadge";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import MenuSidebar from "@/layouts/MainLayout/components/GamesMenuSidebar/GamesMenuSidebar";
import InfoSidebar from "@/layouts/MainLayout/components/InfoSidebar/InfoSidebar";
import MobileInfoSidebar from "@/layouts/MainLayout/components/InfoSidebar/MobileInfoSidebar";
import SpotlightEffect from "@/lib/SpotlightEffect";
import { cn } from "@/lib/utils";
import { $coin } from "@/pages/Main/components/BottomControl/model";
import { Coin } from "@/typings/types";

const MainLayout: React.FC = () => {
  const [coin] = useUnit([$coin]);

  const { isBelowSm } = useBreakpoint("sm");

  return (
    <div className="flex">
      <MenuSidebar />
      <div className="flex flex-grow overflow-y-auto max-sm:flex-col">
        <div
          className={cn(
            "relative flex-grow items-center",
            coin === Coin.TON ? "bg-main-ton" : "bg-main-web3",
          )}
        >
          <SpotlightEffect>
            <div
              className="z-20 flex h-full flex-col p-6 pr-0 max-lg:p-4"
              style={{ minHeight: `calc(100vh - ${HEADER_HEIGHT}px)` }}
            >
              <Outlet />
            </div>
          </SpotlightEffect>
        </div>
        {isBelowSm && <MobileInfoSidebar />}

        {!isBelowSm && <InfoSidebar />}
      </div>
      <TelegramBadge />
    </div>
  );
};

export default MainLayout;
