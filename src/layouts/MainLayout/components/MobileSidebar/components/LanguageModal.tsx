import { DialogTitle } from "@radix-ui/react-dialog";
import { forwardRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { IconCheck, IconChevron, IconLanguage } from "@/assets/icons";
import { changeLanguage } from "@/components/app/Header/components/LanguageSelect/model";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/modal";
import { LS_USER_LANGUAGE } from "@/constants";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Language } from "@/typings/types";

const LanguageModal = forwardRef<HTMLDivElement, unknown>((_props, ref) => {
  const { t, i18n } = useTranslation(`DATA_LANGUAGE_MODAL`);

  const [language, saveLanguage] = useLocalStorage(LS_USER_LANGUAGE);

  const [changedLanguage, setChangedLanguage] = useState<Language>(language);

  const handleSaveLanguage = () => {
    saveLanguage(changedLanguage);
    i18n.changeLanguage(changedLanguage);
    changeLanguage(changedLanguage);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="flex w-full items-center gap-2 text-foreground"
        >
          <IconLanguage className="size-4" />
          {t`trigger`}
          <IconChevron className="ml-auto size-6 -rotate-90" />
        </button>
      </DialogTrigger>
      <DialogContent ref={ref}>
        <DialogTitle className="text-4.5 font-600">{t(`title`)}</DialogTitle>
        <Button
          variant="outline"
          className="flex items-center justify-between p-4"
          onClick={() => {
            setChangedLanguage(Language.EN);
          }}
        >
          English
          {changedLanguage === Language.EN && (
            <IconCheck className="text-foreground" />
          )}
        </Button>
        <Button
          variant="outline"
          className="flex items-center justify-between p-4"
          onClick={() => {
            setChangedLanguage(Language.RU);
          }}
        >
          {t`russian`}
          {changedLanguage === Language.RU && (
            <IconCheck className="text-foreground" />
          )}
        </Button>
        <DialogClose asChild>
          <Button
            className="py-2"
            onClick={handleSaveLanguage}
          >{t`button`}</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
});

LanguageModal.displayName = "LanguageModal";

export default LanguageModal;
