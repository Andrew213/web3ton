import { DialogClose } from "@radix-ui/react-dialog";
import { useTranslation } from "react-i18next";

import { CoinTon, CoinWeb3, ListIcon } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/modal";
import { GAME_RULES } from "@/lib/mockData";

interface Props {
  currency?: "ton" | "web3";
}

const RulesModal: React.FC<Props> = () => {
  const { t } = useTranslation(`DATA_RULES_MODAL`);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full max-w-[167px] rounded-[14px] font-500 max-lg:max-w-[132px]"
        >
          <ListIcon />
          {t(`button_rules`)}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-sm:gap-4 max-sm:p-4">
        <p className="text-4.5 font-h2 leading-4.5">{t(`title`)}</p>
        <p className="leading-6 text-muted-foreground">{t(`description`)}</p>
        <div className="rounded-4 border p-4">
          <div className="mb-5 text-p font-500 leading-6">
            {t(`cardX2title`)}
          </div>
          <div className="mb-5 flex flex-col">
            <span className="mb-2 flex items-center gap-2 text-blockquote font-500">
              <CoinTon className="size-5 -rotate-[15deg]" /> {t(`titleTon`)}
            </span>
            <ul className="ml-6 list-disc leading-6">
              <li>{`${t`winingChance`} ${GAME_RULES.TON[2]?.chance} `}</li>
              <li>
                {t(`cashbackPercent`, {
                  cashbackPercentage: GAME_RULES.TON[2]?.cashback,
                })}
              </li>
            </ul>
          </div>
          <div className="mb-5 flex flex-col">
            <span className="mb-2 flex items-center gap-2 text-blockquote font-500">
              <CoinWeb3 className="size-5 -rotate-[15deg]" /> {t(`titleWeb3`)}
            </span>
            <ul className="ml-6 list-disc leading-6">
              <li>{`${t`winingChance`} ${GAME_RULES.WEB3[2]?.chance} `}</li>
            </ul>
          </div>
        </div>

        <div className="rounded-4 border p-4">
          <div className="mb-5 text-p font-500 leading-6">
            {t(`cardX3title`)}
          </div>

          <div className="flex flex-col">
            <span className="mb-2 flex items-center gap-2 text-blockquote font-500">
              <CoinWeb3 className="size-5 -rotate-[15deg]" /> {t(`titleWeb3`)}
            </span>
            <ul className="ml-6 list-disc leading-6">
              <li>{`${t`winingChance`} ${GAME_RULES.WEB3[3]?.chance} `}</li>
            </ul>
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" className="w-full rounded-[14px] text-text">
              {t(`button_close`)}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RulesModal;
