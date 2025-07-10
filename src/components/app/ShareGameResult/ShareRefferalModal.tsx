import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { IconCheck, IconImage, IconLink } from "@/assets/icons";
import { ImgReferralBg } from "@/assets/img";
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
import { saveDivAsImage } from "@/utils/saveDivAsImage";

import QRcode from "./QRcode";

interface Props {
  referralUrl: string;
  className?: string;
}

const ShareReferralModal: React.FC<Props> = ({ referralUrl, className }) => {
  const [open, setOpen] = useState(false);

  const { t } = useTranslation("DATA_SHARE_GAME_RESULT");

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
        <Button variant="default" type="button" className={className}>
          <span className="sm:hidden">{t(`share`)}</span>
          <span className="max-sm:hidden">{t(`share`)}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full sm:max-w-[670px]">
        <p className="text-4.5 font-h2 leading-4.5">{t(`share`)}</p>
        <div
          id="shareResult"
          className="relative h-[170px] w-full overflow-hidden rounded-2.5 border bg-bg-accent sm:h-[333px] sm:rounded-5"
        >
          <img
            src={ImgReferralBg}
            className="absolute right-0 top-0 h-full min-w-[300px] shrink-0"
            alt="mascot"
          />

          <div className="z-1 relative flex h-full max-w-[150px] flex-col justify-between px-2 py-4 sm:max-w-[370px] sm:px-4 sm:py-8">
            <h2 className="relative z-10 text-[9px] font-black uppercase leading-[110%] tracking-[0.377px] text-foreground sm:text-[18px]">
              <span className="text-[#0098EA]">WEB3 </span>
              Lottery!
            </h2>

            <div>
              <div>
                <span className="font-800 leading-[normal] text-foreground sm:text-[36px]">
                  {t(`invite`)}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-6">
              <QRcode data={referralUrl} />
              <div>
                <p className="w-[180px] text-wrap font-bold text-foreground sm:text-[24px]">{t`scanQr`}</p>
                <p className="text-[6px] text-foreground sm:text-3">
                  web3lottery.com
                </p>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className="flex flex-col gap-4 sm:flex-row">
          <TooltipProvider>
            <Tooltip open={open}>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="flex-auto [&_svg]:size-[26px]"
                  onClick={() => {
                    navigator.clipboard.writeText(referralUrl).then(() => {
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
            className="w-full flex-auto sm:max-w-[186px] [&_svg]:size-[24px]"
            onClick={() => saveDivAsImage("shareResult", "share-result.jpeg")}
          >
            <IconImage className="stroke-white" />
            <span className="hidden sm:block">{t(`save`)}</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShareReferralModal;
