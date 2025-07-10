import { useTranslation } from "react-i18next";

import CoinWeb3 from "@/assets/icons/web3Icon.svg";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useJettonContract } from "@/hooks/useJetton";

const BalanceWeb3Card = () => {
  const { t } = useTranslation("DATA_PROFILE_PAGE");

  const { userBalance, isLoadingUserBalance } = useJettonContract();

  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="px-6 pb-2 pt-6">
        <h3 className="font-500">WEB3 {t`balance`}</h3>
      </CardHeader>
      <CardContent className="space-y-2 px-6 pb-4 pt-3 text-h4 font-h4">
        {isLoadingUserBalance ? (
          <Skeleton className="h-7" />
        ) : (
          <span>{userBalance}</span>
        )}
      </CardContent>
      <CoinWeb3 className="muted-coin absolute -right-7 -top-4 size-[146px] opacity-10" />
    </Card>
  );
};

export default BalanceWeb3Card;
