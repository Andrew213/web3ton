import { useUnit } from "effector-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Card, CardContent } from "@/components/ui/card";
import { GAME_RULES } from "@/lib/mockData";
import { formatProfit } from "@/lib/utils";
import {
  $amount,
  $coin,
  $multiplier,
} from "@/pages/Main/components/BottomControl/model";
import { Coin } from "@/typings/types";
import { getImageOfCoin } from "@/utils/getImageOfCoin";

import { $rates, fetchRates } from "./model";

const GameInfoCard: React.FC = () => {
  const [currency, multiplier, amount, rates] = useUnit([
    $coin,
    $multiplier,
    $amount,
    $rates,
  ]);

  const amountToNumber = Number(amount);

  const { t } = useTranslation("DATA_GAME_INFO_CARD");
  const CoinImage = getImageOfCoin(currency);
  const Web3Image = getImageOfCoin(Coin.WEB3);

  useEffect(() => {
    fetchRates("EQBtcL4JA-PdPiUkB8utHcqdaftmUSTqdL8Z1EeXePLti_nK");
  }, []);

  return (
    <Card>
      <CardContent className="grid grid-cols-2 grid-rows-2 gap-x-12 gap-y-3 py-4">
        <div className="flex items-center justify-between">
          <span className="text-3 font-p text-muted-foreground">
            {t`multiplier`}
          </span>
          <span className="font-h3">x{multiplier}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-3 font-p text-muted-foreground">
            {t`winChance`}
          </span>
          <span className="font-h3">
            {GAME_RULES[currency][multiplier]?.chance}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-3 font-p text-muted-foreground">
            {t`profit`}
          </span>
          <span className="flex items-center gap-1 font-h3">
            {amountToNumber ? formatProfit(amountToNumber, multiplier) : "-"}
            <CoinImage className="size-5 -rotate-[15deg]" />
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-3 font-p text-muted-foreground">
            {t`cashback`}
          </span>
          <span className="flex items-center gap-1 font-h3">
            {currency === Coin.TON && amountToNumber && rates
              ? Math.floor((0.25 * amountToNumber) / rates)
              : "-"}
            <Web3Image className="size-5 -rotate-[15deg]" />
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default GameInfoCard;
