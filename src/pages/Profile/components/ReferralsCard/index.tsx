import { useTonAddress } from "@tonconnect/ui-react";
import { useUnit } from "effector-react";
import React from "react";
import { useTranslation } from "react-i18next";

import { $userStats } from "@/components/app/Header/components/WalletMenu/model";
import ShareReferralModal from "@/components/app/ShareGameResult/ShareRefferalModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Coin } from "@/typings/types";
import { getImageOfCoin } from "@/utils/getImageOfCoin";

import RulesModal from "./RulesModal";

const Web3Image = getImageOfCoin(Coin.WEB3);

const ReferralsCard = () => {
  const [userStats] = useUnit([$userStats]);
  const { t } = useTranslation("DATA_REFERRALS_CARD");
  const userFriendlyAddress = useTonAddress();

  // value will have to come from the server in the “reward_amount” field
  const rewardAmount = 0;
  const verifiedRefs = userStats?.verified_refs || 0;

  const referralUrl = `${import.meta.env.VITE_URL}/?ref=${userFriendlyAddress}`;

  return (
    <Card>
      <CardHeader className="px-6 pb-0 pt-6">
        <h3 className="font-500">{t`title`}</h3>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="flex w-full items-center gap-8">
          <div className="flex flex-row space-x-2">
            <span className="text-3 font-p text-muted-foreground">
              {t(`rewards`)}
            </span>
            <span className="flex items-center gap-1 font-h3">
              <span>{rewardAmount}</span>

              <Web3Image className="size-5 -rotate-[15deg]" />
            </span>
          </div>

          <div className="flex flex-row space-x-2">
            <span className="text-3 font-p text-muted-foreground">
              {t(`referrals`)}
            </span>
            <span className="flex items-center gap-1 font-h3">
              {verifiedRefs > 0 ? verifiedRefs : "-"}
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <ShareReferralModal referralUrl={referralUrl} />
          {rewardAmount > 0 && (
            <Button variant="secondary">{t(`button_claim`)}</Button>
          )}
          <RulesModal referralUrl={referralUrl} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ReferralsCard;
