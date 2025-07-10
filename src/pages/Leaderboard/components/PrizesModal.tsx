import { DialogClose } from "@radix-ui/react-dialog";
import { useUnit } from "effector-react";
import { useTranslation } from "react-i18next";

import GiftIcon from "@/assets/icons/gift.svg";
import Medal1 from "@/assets/icons/medal1.svg";
import Medal2 from "@/assets/icons/medal2.svg";
import Medal3 from "@/assets/icons/medal3.svg";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/modal";
import { $coin } from "@/pages/Main/components/BottomControl/model";
import { getImageOfCoin } from "@/utils/getImageOfCoin";

interface Props {
  currency?: "ton" | "web3";
}

const PrizesModal: React.FC<Props> = () => {
  const [currency] = useUnit([$coin]);

  const Coin = getImageOfCoin(currency);

  const { t } = useTranslation("DATA_LEADERBOARD_PAGE");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <GiftIcon />
          {t`prizes`}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[462px] rounded-[14px] max-sm:w-[300px] max-sm:p-4">
        <p className="text-4.5 font-h2 leading-4.5">{t`prizes`}</p>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between rounded-4 border p-4">
            <div className="flex items-center gap-2">
              <Medal1 className="h-6 w-6" />
              <span>{t`firstPlace`}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>{currency}</span>

              <Coin className="size-5" />
            </div>
          </div>
          <div className="flex items-center justify-between rounded-4 border p-4">
            <div className="flex items-center gap-2">
              <Medal2 className="h-6 w-6" />
              <span>{t`secondPlace`}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>{currency}</span>

              <Coin className="size-5" />
            </div>
          </div>
          <div className="flex items-center justify-between rounded-4 border p-4">
            <div className="flex items-center gap-2">
              <Medal3 className="h-6 w-6" />
              <span>{t`thirdPlace`}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>{currency}</span>
              <Coin className="size-5" />
            </div>
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" className="w-full rounded-[14px] text-text">
              {t`textButton`}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PrizesModal;
