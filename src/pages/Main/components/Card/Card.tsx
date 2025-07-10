import { useUnit } from "effector-react";
import { useTranslation } from "react-i18next";

import {
  StatusCardCashback,
  StatusCardDefault,
  StatusCardLose,
  StatusCardSuccess,
} from "@/assets/img";
import { $language } from "@/components/app/Header/components/LanguageSelect/model";
import { cn } from "@/lib/utils";
import { $coin } from "@/pages/Main/components/BottomControl/model";
import { GameStatus } from "@/pages/Main/components/Card/model";
import { Coin as CoinType, Language } from "@/typings/types";
import { getImageOfCoin } from "@/utils/getImageOfCoin";

interface Props {
  flip?: boolean;
  onReset?: () => void;
  status?: GameStatus;
  amount?: number;
  isBackFace?: boolean;
  className?: string;
}

const gradient: Record<GameStatus, { from: string; to: string }> = {
  success: {
    from: "from-green-500",
    to: "to-yellow-400",
  },
  default: {
    from: "from-[#8C58FF]",
    to: "to-[#783CFF]",
  },
  cashback: {
    from: "from-[#0098EA]",
    to: "to-[#793DFF]",
  },
  lose: {
    from: "from-[#141420]",
    to: "to-[#793DFF]",
  },
};

const Card: React.FC<Props> = ({ amount, className, status = "default" }) => {
  let Coin: React.FunctionComponent<React.SVGProps<SVGSVGElement>> | null =
    null;

  const { t } = useTranslation("DATA_CARD");

  const [currency, language] = useUnit([$coin, $language]);

  let mascotSrc = "";

  switch (status) {
    case "lose":
      mascotSrc = StatusCardLose;
      break;
    case "cashback":
      mascotSrc = StatusCardCashback;
      break;
    case "success":
      mascotSrc = StatusCardSuccess;
      break;
    default:
      mascotSrc = StatusCardDefault;
  }

  if (currency && status === "success") {
    Coin = getImageOfCoin(currency);
  }

  if (status === "cashback") {
    Coin = getImageOfCoin(CoinType.WEB3);
  }

  return (
    <div
      className={cn(
        `absolute inset-0 rounded-4 bg-gradient-to-b shadow-card-shadow max-lg:h-[450px] max-lg:w-[316px] max-md:h-[600px] max-md:w-[420px] max-sm:h-[450px] max-sm:w-[316px] lg:h-[600px] lg:w-[420px]`,
        status !== "lose"
          ? `${gradient[status].from} ${gradient[status].to}`
          : "bg-purple",
        className,
      )}
    >
      <div className="absolute size-full text-center">
        {status === "default" && (
          <div className="max-md::mt-13.5 text-white max-lg:mt-10 max-sm:mt-10 lg:mt-13.5">
            <p className="text-7 font-800 max-sm:text-5.25">
              {t(status).toUpperCase()}
            </p>
          </div>
        )}
        {(status === "success" || status === "cashback") && (
          <div className="mt-[25px]">
            <p className="font-th text-white max-lg:text-4.5 max-md:text-card max-sm:text-4.5 lg:text-card">
              {t(status).toUpperCase()}
            </p>
            <p className="mt-1.25 font-card text-white max-lg:text-9 max-md:text-h1 max-sm:text-9 lg:text-h1">{`+${amount} ${status === "success" ? currency?.toUpperCase() : "WEB3"}`}</p>
          </div>
        )}
        {status === "lose" && (
          <div className="max-md::mt-13.5 text-white max-lg:mt-10 max-sm:mt-10 lg:mt-13.5">
            <p className="font-card max-lg:text-7 max-md:text-9 max-sm:text-7 lg:text-9">
              {t(status).toUpperCase()}
            </p>
          </div>
        )}
      </div>
      {/* prettier-ignore */}
      <div className="
      absolute 
      size-full 
      overflow-hidden 
      before:absolute 
      before:-left-[164px] 
      lg:before:top-[33%] 
      max-md:before:top-[33%] 
      lg:before:h-[28px] 
      max-md:before:h-[28px] 
      lg:before:w-[908px] 
      max-md:before:w-[908px] 
      before:rotate-[40deg] 
      before:bg-gradient-to-r 
      before:from-card-before-start 
      before:to-card-before-end 

      after:absolute 
      after:-left-full 
      after:top-[14%] 
      after:z-0 
      lg:after:h-[180px] 
      max-md:after:h-[180px] 
      lg:after:w-[908px] 
      max-md:after:w-[908px] 
      after:rotate-[40deg] 
      after:bg-gradient-to-r
      after:from-card-before-start 
      after:to-card-before-end 
      
      max-sm:before:top-[25%] 
      max-sm:before:h-[28px] 
      max-sm:before:w-[683px] 
      max-sm:after:h-[136px] 
      max-sm:after:w-[683px]

      max-lg:before:top-[25%] 
      max-lg:before:h-[28px] 
      max-lg:before:w-[683px] 
      max-lg:after:h-[136px] 
      max-lg:after:w-[683px]
      " 
      />

      {Coin && (
        <div className="absolute top-0 size-full overflow-hidden">
          <Coin
            className={cn(
              "absolute left-16 top-40 -rotate-[40deg] max-lg:size-10 max-md:size-20 max-sm:size-10 lg:size-20",
              status === "cashback" &&
                "left-7 top-[290px] size-17 rotate-[0deg] max-sm:left-5 max-sm:top-60",
            )}
          />
          <Coin
            className={cn(
              "absolute bottom-[58px] right-7.5 max-lg:size-15 max-md:size-26.5 max-sm:size-15 lg:size-26.5",
              status === "cashback" &&
                "size-20 max-lg:right-5 max-lg:top-40 max-md:right-10 max-md:top-50 max-sm:right-5 max-sm:top-40 lg:right-10 lg:top-50",
            )}
          />
          <Coin
            className={cn(
              "absolute -bottom-[37px] left-3.75 -rotate-[44deg] max-lg:size-[130px] max-md:size-[190px] max-sm:size-[130px] lg:size-[190px]",
              status === "cashback" && "left-0 size-40",
            )}
          />
        </div>
      )}
      <img
        src={mascotSrc}
        alt="success mascot"
        className={cn(
          "absolute bottom-0 max-w-[480px] max-lg:w-full max-sm:w-full",

          status === "success" ? "-left-[4%]" : "left-5.5",
          status === "cashback" || status === "lose"
            ? "max-sm:left-[7%] max-sm:w-[290px]"
            : "max-sm:w-[361px]",
          status === "default" &&
            language === Language.RU &&
            "-left-[5%] w-[518px] max-w-[518px] max-sm:h-[390px]",
          status === "default" &&
            language === Language.EN &&
            "left-[4%] max-sm:max-w-[325px]",
        )}
      />
    </div>
  );
};

export default Card;
