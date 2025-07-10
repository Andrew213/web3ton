import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components/ui/tooltip";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { IconCheck, IconCopy } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cropAddress } from "@/utils/cropAddress";

interface Props {
  walletAddress: string;
}

const WalletAddressCard = ({ walletAddress }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const { t } = useTranslation("DATA_PROFILE_PAGE");

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
    <Card className="flex flex-col justify-between gap-8 px-6 py-7 sm:col-span-2 lg:flex-row">
      <div className="flex w-full">
        <div className="w-full">
          <h3 className="font-500">{t`walletAddress`}</h3>
          <div className="mt-2 flex w-full flex-col gap-2 sm:flex-row sm:gap-4">
            <span className="block text-h3 font-th">
              {cropAddress(walletAddress)}
            </span>

            <TooltipProvider>
              <Tooltip open={open}>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    className="h-8 w-fit text-muted-foreground [&_svg]:size-[16px]"
                    onClick={() => {
                      navigator.clipboard.writeText(walletAddress).then(() => {
                        setOpen(true);
                      });
                    }}
                  >
                    <IconCopy className="stroke-muted-foreground" />
                    {t(`button_copy`)}
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  align="center"
                  className="mx-auto flex items-center space-x-1 p-2 py-1 text-muted-foreground"
                >
                  <p>{t(`copied`)}</p>
                  <IconCheck />
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WalletAddressCard;
