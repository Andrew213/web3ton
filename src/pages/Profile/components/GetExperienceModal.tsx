import { DialogClose } from "@radix-ui/react-dialog";
import { useTranslation } from "react-i18next";

import { IconInfo } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/modal";

interface Props {
  currency?: "ton" | "web3";
}

const betsData = [
  { betAmount: "0.5", multiplier: 1.0, expAmount: 0.5 },
  { betAmount: "1 - 2", multiplier: 1.1, expAmount: 1.1 },
  { betAmount: "2 - 5", multiplier: 1.2, expAmount: 2.4 },
  { betAmount: "5 - 10", multiplier: 1.3, expAmount: 6.5 },
  { betAmount: "10 - 15", multiplier: 1.4, expAmount: 14 },
  { betAmount: "15 - 20", multiplier: 1.5, expAmount: 22.5 },
  { betAmount: "20 - 25", multiplier: 1.6, expAmount: 30 },
  { betAmount: "25 - 30", multiplier: 1.7, expAmount: 35 },
  { betAmount: "30 - 40", multiplier: 1.8, expAmount: 54 },
  { betAmount: "40 - 50", multiplier: 1.9, expAmount: 76 },
  { betAmount: "50 - 75", multiplier: 2.0, expAmount: 100 },
  { betAmount: "75 - 100", multiplier: 2.5, expAmount: 187.5 },
  { betAmount: "100", multiplier: 3.0, expAmount: 300 },
];

const GetExpModal: React.FC<Props> = () => {
  const { t } = useTranslation("DATA_PROFILE_PAGE");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="max-sm:w-full" variant="outline">
          <IconInfo />
          {t`getExperience`}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <p className="text-4.5 font-h2 leading-4.5">{t`getExperience`}</p>
        <div className="flex flex-col gap-3">
          <div className="flex items-center text-3 text-[#5C6879]">
            <p className="w-2/3">{t`betAmount`}</p>
            <p className="w-1/3">{t`expAmount`}</p>
          </div>
          <div className="max-h-[60vh] overflow-y-auto">
            <ul>
              {betsData.map((betData) => (
                <li
                  key={betData.betAmount}
                  className="flex items-center border-b py-2"
                >
                  <span className="w-2/3 font-bold">{betData.betAmount}</span>
                  <span className="w-1/3 font-extrabold text-primary">
                    X{betData.multiplier}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" className="w-full">
              {t`textButton`}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GetExpModal;
