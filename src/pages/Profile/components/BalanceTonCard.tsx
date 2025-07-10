import { useTranslation } from "react-i18next";

import CoinTon from "@/assets/icons/tonIcon.svg";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import useTonBalance from "@/hooks/useTonBalance";

const BalanceTonCard = () => {
  const { loading, tonBalance } = useTonBalance();

  const { t } = useTranslation("DATA_PROFILE_PAGE");

  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="px-6 pb-2 pt-6">
        <h3 className="font-500">TON {t`balance`}</h3>
      </CardHeader>
      <CardContent className="space-y-2 px-6 pb-4 pt-3 text-h4 font-h4">
        {loading ? <Skeleton className="h-7" /> : <span>{tonBalance}</span>}
      </CardContent>
      <CoinTon className="muted-coin absolute -right-7 -top-4 size-[146px] opacity-10" />
    </Card>
  );
};

export default BalanceTonCard;
