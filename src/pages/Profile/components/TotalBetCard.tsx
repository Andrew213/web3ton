import { useUnit } from "effector-react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { IconTrophy } from "@/assets/icons";
import {
  $isUserStatsLoading,
  $userStats,
} from "@/components/app/Header/components/WalletMenu/model";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { nanoToTon } from "@/lib/utils";
import { nanoToJetton } from "@/utils/nanoToJetton";

const TotalBetCard = () => {
  const [userStats, loading] = useUnit([$userStats, $isUserStatsLoading]);

  const [totalBetTON, setTotalBetTon] = useState(0);
  const [totalBetJetton, setTotalBetJetton] = useState(0);

  useEffect(() => {
    if (userStats) {
      setTotalBetTon(nanoToTon(userStats.ton_in));
      setTotalBetJetton(
        nanoToJetton(userStats.jetton_in_x2 + userStats.jetton_in_x3),
      );
    }
  }, [userStats]);

  const { t } = useTranslation("DATA_PROFILE_PAGE");

  return (
    <Card>
      <CardHeader className="px-6 pb-2 pt-6">
        <h3 className="font-500">{t`totalBet`}</h3>
        <IconTrophy />
      </CardHeader>
      <CardContent className="space-y-2 px-6 pb-4 pt-3 text-h4 font-h4">
        <div className="space-x-1">
          {loading ? (
            <Skeleton className="h-7" />
          ) : (
            <>
              <span>{totalBetTON}</span>
              <span className="text-muted-foreground">TON</span>
            </>
          )}
        </div>
        <div className="space-x-1">
          {loading ? (
            <Skeleton className="h-7" />
          ) : (
            <>
              <span>{totalBetJetton}</span>
              <span className="text-muted-foreground">WEB3</span>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TotalBetCard;
