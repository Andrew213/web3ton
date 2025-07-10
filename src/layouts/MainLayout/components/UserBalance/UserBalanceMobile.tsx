import { useTonAddress } from "@tonconnect/ui-react";
import { useUnit } from "effector-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Skeleton } from "@/components/ui/skeleton";
import { useJettonContract } from "@/hooks/useJetton";
import useTonBalance from "@/hooks/useTonBalance";
import { $coin } from "@/pages/Main/components/BottomControl/model";
import { $gameResult } from "@/pages/Main/components/Card/model";
import { Coin } from "@/typings/types";

const UserBalanceMobile = () => {
  const { userBalance, isLoadingUserBalance, getJettonBalance } =
    useJettonContract();

  const [coin, gameResult] = useUnit([$coin, $gameResult]);

  const userFriendlyAddress = useTonAddress();

  const { t } = useTranslation("DATA_USER_BALANCE_CARD");

  const { loading, tonBalance, getTonBalance } = useTonBalance();

  const isLoading = loading || isLoadingUserBalance;

  useEffect(() => {
    if (gameResult) {
      getJettonBalance();
      getTonBalance();
    }
  }, [gameResult]);

  if (!userFriendlyAddress) {
    return null;
  }

  return (
    <div className="flex justify-between capitalize max-lg:gap-1">
      {t(`balance`)}
      {isLoading ? (
        <Skeleton className="h-4 w-12" />
      ) : (
        <span className="text-inverse">
          {`${coin === Coin.TON ? tonBalance : (userBalance ?? 0)} ${coin}`}
        </span>
      )}
    </div>
  );
};

export default UserBalanceMobile;
