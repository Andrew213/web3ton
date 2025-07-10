import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  IconCheck,
  IconExtLink,
  IconImage,
  IconLink,
  TGIcon,
} from "@/assets/icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/modal";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn, getResultImage } from "@/lib/utils";
import { Coin } from "@/typings/types";
import { nanoToJetton } from "@/utils/nanoToJetton";
import { saveDivAsImage } from "@/utils/saveDivAsImage";

interface Props {
  isTon: boolean;
  isWin: boolean;
  gameMode: 0 | 1;
  betAmount: number;
  winAmount: number;
  cashback: number;
  id: number;
  className?: string;
}

const ShareGameResultModal: React.FC<Props> = ({
  isTon,
  isWin,
  gameMode,
  betAmount,
  cashback,
  winAmount,
  id,
  className,
}) => {
  const [open, setOpen] = useState(false);

  const { t } = useTranslation("DATA_SHARE_GAME_RESULT");

  const formatCashback = nanoToJetton(cashback).toFixed(0);

  const url = encodeURIComponent(
    `${import.meta.env.VITE_URL}/api/game/${id}` || "",
  );

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (open) {
      timer = setTimeout(() => {
        setOpen(false);
      }, 2000);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [open]);

  return (
    <Dialog>
      <DialogTrigger asChild className="w-full sm:w-fit">
        <Button variant="secondary" type="button" className={className}>
          <span className="sm:hidden">{t(`share`)}</span>
          <span className="max-sm:hidden">{t(`share`)}</span>
          <IconExtLink className={cn("stroke-foreground", className)} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <p className="text-4.5 font-h2 leading-4.5">{t(`share`)}</p>
        <div
          id={`shareResult-${id}`}
          className="relative h-[170px] w-full overflow-hidden rounded-2.5 border bg-bg-accent sm:h-[333px] sm:rounded-5"
        >
          <img
            src={getResultImage(isTon, isWin)}
            className="absolute right-0 top-0 h-full min-w-[300px] shrink-0"
            alt="mascot"
          />

          <div className="z-1 relative flex h-full max-w-[175px] flex-col justify-between px-2 py-4 sm:max-w-[315px] sm:px-4 sm:py-8">
            <h2 className="relative z-10 text-[9px] font-black uppercase leading-[110%] tracking-[0.377px] text-foreground sm:text-[18px]">
              <span className="text-[#0098EA]">WEB3 </span>
              Lottery!
            </h2>

            <div className="text-foreground">
              <div>
                {isTon ? (
                  <p className="font-bold max-sm:text-[8px]">
                    {isWin ? t(`myResults`) : t(`cashback`)}
                  </p>
                ) : (
                  isWin && <p className="font-bold">{t(`myResults`)}</p>
                )}

                {isTon ? (
                  <span className="text-5.25 font-800 sm:text-[36px]">
                    {isWin
                      ? `+${winAmount} ${Coin.TON}`
                      : `+${formatCashback} ${Coin.WEB3}`}
                  </span>
                ) : (
                  <span className="max-w-[150px] text-5.25 font-800 leading-[normal] sm:w-[315px] sm:text-[36px]">
                    {isWin ? `+${winAmount} ${Coin.WEB3}` : t(`lose`)}
                  </span>
                )}
              </div>

              <div className="mt-2 grid grid-cols-2 text-[6px] sm:mt-4 sm:text-3">
                <div className="space-y-2">
                  <p className="font-600 text-muted-foreground">
                    {t(`betAmount`)}
                  </p>
                  <p className="font-bold text-foreground">{`${betAmount} ${isTon ? Coin.TON : Coin.WEB3}`}</p>
                </div>
                <div className="w-[140px] space-y-2">
                  <p className="font-600 text-muted-foreground">{t(`game`)}</p>
                  <p className="font-bold text-foreground">
                    {`Multiplication Magic X${gameMode ? 3 : 2}`}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-[6px] text-foreground sm:text-3">
              web3lottery.com
            </p>
          </div>
        </div>
        <DialogFooter className="flex gap-4">
          <a
            href={`https://t.me/share/url?url=${url}&text=`}
            target="_blank"
            className="max-w-[186px] flex-auto"
            rel="noreferrer"
          >
            <Button
              type="button"
              variant="outline"
              className="h-14 w-full [&_svg]:size-8"
            >
              <TGIcon className="hover:opacity-10" />
            </Button>
          </a>

          <TooltipProvider>
            <Tooltip open={open}>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="flex-auto [&_svg]:size-[26px]"
                  onClick={() => {
                    navigator.clipboard
                      .writeText(`${import.meta.env.VITE_URL}/api/game/${id}`)
                      .then(() => {
                        setOpen(true);
                      });
                  }}
                >
                  <IconLink className="stroke-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="flex items-center space-x-1 p-2 px-6">
                <p>{t(`copiedLink`)}</p>
                <IconCheck />
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button
            type="button"
            variant="default"
            className="max-w-[186px] flex-auto [&_svg]:size-[24px]"
            onClick={() =>
              saveDivAsImage(`shareResult-${id}`, "share-result.jpeg")
            }
          >
            <IconImage className="stroke-white" />
            <span className="hidden sm:block">{t(`save`)}</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShareGameResultModal;
