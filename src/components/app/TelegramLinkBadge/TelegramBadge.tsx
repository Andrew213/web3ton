import React, { FC } from "react";
import { useTranslation } from "react-i18next";

import { TGIcon } from "@/assets/icons";

interface IProps {
  isMobile?: boolean;
}

const TelegramBadge: FC<IProps> = ({ isMobile = false }) => {
  const { t } = useTranslation("translation");
  if (isMobile) {
    return (
      <a
        className="mt-10 flex w-full items-center justify-center gap-2"
        href={import.meta.env.VITE_TG_URL}
      >
        <TGIcon />
        <p>{t`joinChannel`}</p>
      </a>
    );
  }

  return (
    <a
      href={import.meta.env.VITE_TG_URL}
      className="group absolute bottom-4 left-4 z-20 hidden w-[184px] cursor-pointer overflow-hidden rounded-full lg:block"
    >
      <TGIcon className="relative z-20 size-8" />
      <div className="text-sm absolute -left-16 top-1/2 w-fit -translate-y-1/2 transform text-nowrap rounded-full bg-gray-800 px-3 py-2 leading-5 text-white opacity-0 transition-all duration-500 group-hover:translate-x-16 group-hover:pl-10 group-hover:opacity-100">
        {t`joinChannel`}
      </div>
    </a>
  );
};

export default TelegramBadge;
