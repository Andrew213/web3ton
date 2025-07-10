import { useUnit } from "effector-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useJettonContract } from "@/hooks/useJetton";
import useTonBalance from "@/hooks/useTonBalance";
import { $gameResult } from "@/pages/Main/components/Card/model";
import { Coin } from "@/typings/types";
import { getImageOfCoin } from "@/utils/getImageOfCoin";

const UserBalanceCard = () => {
  const {
    userBalance,
    isLoadingUserBalance: jettonLoading,
    getJettonBalance,
  } = useJettonContract();

  const [gameResult] = useUnit([$gameResult]);

  const { t } = useTranslation("DATA_USER_BALANCE_CARD");

  const TonImage = getImageOfCoin(Coin.TON);
  const Web3Image = getImageOfCoin(Coin.WEB3);

  const { loading, tonBalance, getTonBalance } = useTonBalance();

  useEffect(() => {
    if (gameResult) {
      getJettonBalance();
      getTonBalance();
    }
  }, [gameResult]);

  return (
    <Card>
      <CardContent className="flex items-center gap-x-12 py-4">
        <div className="flex w-full items-center justify-between">
          <span className="text-3 font-p text-muted-foreground">
            {`${Coin.TON} ${t`balance`}`}
          </span>
          <span className="flex items-center gap-1 font-h3">
            {loading ? (
              <Skeleton className="h-4 w-8 lg:w-12" />
            ) : (
              <span>{tonBalance}</span>
            )}
            <TonImage className="size-5 -rotate-[15deg]" />
          </span>
        </div>
        <div className="flex w-full items-center justify-between">
          <span className="text-3 font-p text-muted-foreground">
            {`${Coin.WEB3} ${t`balance`}`}
          </span>
          <span className="flex items-center gap-1 font-h3">
            {jettonLoading ? (
              <Skeleton className="h-4 w-8 lg:w-12" />
            ) : (
              <span>{userBalance ?? 0}</span>
            )}
            <Web3Image className="size-5 -rotate-[15deg]" />
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserBalanceCard;
