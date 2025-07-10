import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { IconCheck, IconChevron } from "@/assets/icons";
import { changeLanguage } from "@/components/app/Header/components/LanguageSelect/model";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { LS_USER_LANGUAGE } from "@/constants";
import useLocalStorage from "@/hooks/useLocalStorage";
import { cn } from "@/lib/utils";
import { Language } from "@/typings/types";

const LanguageSelect: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useLocalStorage(LS_USER_LANGUAGE, "EN");

  const { t, i18n } = useTranslation("translation");

  useEffect(() => {
    i18n.changeLanguage(language);
    changeLanguage(language);
  }, [language]);

  return (
    <div className="max-md:hidden">
      <DropdownMenu onOpenChange={() => setIsOpen((prev) => !prev)}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative rounded-[14px] border">
            {Language[language as Language]}
            <IconChevron
              className={`${isOpen ? "rotate-180" : "rotate-0"} text-foreground transition-transform duration-200`}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          asChild
          className="flex w-full min-w-[221px] max-w-64 flex-col gap-3 rounded-[14px] p-3"
        >
          <ul>
            <li
              className={cn(
                "transition-color group rounded-3 px-3 py-[6px] hover:bg-secondary",
                language === Language.EN && "bg-secondary",
              )}
            >
              <button
                type="button"
                className="flex w-full items-center justify-between"
                onClick={() => {
                  setLanguage(Language.EN);
                }}
              >
                English
                {language === Language.EN && <IconCheck />}
              </button>
            </li>
            <li
              className={cn(
                "transition-color group rounded-3 px-3 py-[6px] duration-200 hover:bg-secondary",
                language === Language.RU && "bg-secondary",
              )}
            >
              <button
                type="button"
                className="flex w-full items-center justify-between"
                onClick={() => {
                  setLanguage(Language.RU);
                }}
              >
                {t`russian`}
                {language === "RU" && <IconCheck />}
              </button>
            </li>
          </ul>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LanguageSelect;
