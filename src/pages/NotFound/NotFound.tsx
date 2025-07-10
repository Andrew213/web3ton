import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { NotFoundBG } from "@/assets/icons";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const { t } = useTranslation(`DATA_NOTFOUND_PAGE`);

  return (
    <div className="flex h-full items-center justify-center overflow-hidden">
      <div className="relative w-[345px] text-center sm:w-fit">
        <h1 className="text-[80px] font-800 leading-[80px] sm:text-[104px] sm:leading-[104px]">
          404
        </h1>
        <p className="text-[30px] font-600 sm:text-[36px] sm:font-800">
          {t(`notFound`)}
        </p>
        <p className="mb-8 mt-3 text-[16px]">{t(`message`)}</p>
        <Link to="/">
          <Button className="w-full md:w-[163px]">{t("buttonBack")}</Button>
        </Link>
        <NotFoundBG className="absolute left-1/2 top-1/2 -z-10 size-[900px] -translate-x-1/2 -translate-y-1/2 transform opacity-[--bg-opacity]" />
      </div>
    </div>
  );
};

export default NotFound;
