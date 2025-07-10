import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { IconCheck, IconLink } from "@/assets/icons";
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

interface Props {
  referralUrl: string;
}

const RulesModal: React.FC<Props> = ({ referralUrl }) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation("DATA_REFERRALS_CARD");

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
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-[14px] font-500">
          {t(`button_rules`)}
        </Button>
      </DialogTrigger>
      <DialogContent className="gap-6 max-sm:p-4">
        <h2 className="text-4.5 font-h2 leading-4.5">{t(`rules.title`)}</h2>

        <section>
          <h3 className="font-semibold">{t(`rules.general.title`)}</h3>
          <p className="mt-1">{t(`rules.general.description`)}</p>
        </section>

        <section>
          <h3 className="font-semibold">{t(`rules.condition.title`)}</h3>
          <p className="mt-1">{t(`rules.condition.description`)}</p>
        </section>

        <section>
          <h3 className="font-semibold">{t(`rules.rewards.title`)}</h3>
          <p className="mt-1">{t(`rules.rewards.description`)}</p>
        </section>

        <section>
          <h3 className="font-semibold">{t(`rules.withdraw.title`)}</h3>
          <p className="mt-1 font-p">{t(`rules.withdraw.description`)}</p>
        </section>
        <DialogFooter className="w-full sm:justify-start">
          <TooltipProvider>
            <Tooltip open={open}>
              <TooltipTrigger asChild>
                <Button
                  variant="default"
                  className="w-full flex-auto [&_svg]:size-[26px]"
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RulesModal;
