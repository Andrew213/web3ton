import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";

import { HEADER_HEIGHT } from "@/components/app/Header/constants";
import Header from "@/components/app/Header/Header";
import { LS_USER_LANGUAGE } from "@/constants";
import useLocalStorage from "@/hooks/useLocalStorage";

const RootLayout = () => {
  const [language] = useLocalStorage(LS_USER_LANGUAGE, "EN");

  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <div className="relative flex h-screen flex-col overflow-hidden">
      <div className="relative z-30">
        <Header />
      </div>
      <div
        style={{ minHeight: `calc(100vh - ${HEADER_HEIGHT}px)` }}
        className="overflow-y-auto"
      >
        <Outlet />
      </div>
    </div>
  );
};

export { RootLayout };
