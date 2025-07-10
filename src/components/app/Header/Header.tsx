import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import LanguageSelect from "@/components/app/Header/components/LanguageSelect/LanguageSelect";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import MobileSidebar from "@/layouts/MainLayout/components/MobileSidebar/MobileSidebar";

import { useTheme } from "../../../core/providers/ThemeProviderContext";
import BurgerButton from "../../ui/BurgerButton";
import { Switch } from "../../ui/switch";
import ExperienceBar from "./components/ExperienceBar";
import WalletMenu from "./components/WalletMenu/WalletMenu";
import { HEADER_HEIGHT } from "./constants";

const Header: React.FC = () => {
  const [isOpenMobileSidebar, setIsOpenMobileSidebar] = useState(false);

  const burgerButtonRef = useRef<HTMLButtonElement>(null);

  const [theme, setTheme] = useTheme();

  const { isBelowLg, isAboveLg } = useBreakpoint("lg");

  const { t } = useTranslation("translation");

  return (
    <header
      style={{
        height: `${HEADER_HEIGHT}px`,
      }}
      className="z-20 flex items-center justify-between border-b bg-background px-6 max-lg:p-4"
    >
      <Link to="/">
        <h1 className="text-4.5 font-h1">
          <span className="mr-[2px] text-[#0098EA]">WEB3</span>
          Lottery
        </h1>
      </Link>

      <ExperienceBar />

      {isBelowLg && (
        <div className="flex items-center gap-6 lg:hidden">
          <WalletMenu />
          <div>
            <BurgerButton
              ref={burgerButtonRef}
              onClick={() => setIsOpenMobileSidebar((prev) => !prev)}
              className="hidden max-lg:flex"
              isActive={isOpenMobileSidebar}
            />
            <MobileSidebar
              preventCloseRefs={[burgerButtonRef]}
              open={isOpenMobileSidebar}
              onClose={() => setIsOpenMobileSidebar(false)}
            />
          </div>
        </div>
      )}
      <div className="flex items-center gap-5 max-lg:hidden">
        <div className="flex items-center">
          <p className="mr-2 font-500">{t`theme`}</p>
          <Switch
            checked={theme === "dark"}
            onCheckedChange={(isEnabled) => {
              if (setTheme) {
                setTheme(isEnabled ? "dark" : "light");
              }
            }}
          />
        </div>
        <LanguageSelect />
        {isAboveLg && <WalletMenu />}
      </div>
    </header>
  );
};

export default Header;
