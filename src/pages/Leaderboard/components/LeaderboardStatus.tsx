import { useUnit } from "effector-react";
import { useTranslation } from "react-i18next";

import { Player } from "@/api/types";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { nanoToTon } from "@/lib/utils";
import { Coin } from "@/typings/types";
import { cropAddress } from "@/utils/cropAddress";

import { $isGlobalRatingLoading } from "../model";

interface IProps {
  player: Player | null;
}
const LeaderboardStatus: React.FC<IProps> = ({ player }) => {
  const { t } = useTranslation(`DATA_LEADERBOARD_PAGE`);
  const [loading] = useUnit([$isGlobalRatingLoading]);

  const showLoading = () => {
    return (
      <>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-1/3" />
      </>
    );
  };

  if (!player) {
    return (
      <Card className="mt-6 flex w-full max-w-308 flex-col items-center justify-between gap-4 px-3 py-4 sm:flex-row md:px-6">
        Error
      </Card>
    );
  }

  return (
    <Card className="mt-6 flex w-full max-w-308 flex-col items-center justify-between gap-4 px-3 py-4 sm:flex-row md:px-6">
      {loading ? (
        showLoading()
      ) : (
        <>
          <div className="self-start">
            <h3 className="font-bold">{t(`leaderboardStatus`)}</h3>
            <p className="text-3 text-muted-foreground">
              {t(`positionMessage`)}
            </p>
          </div>

          <div className="flex w-full justify-between sm:w-[400px] sm:justify-normal sm:gap-10">
            <div className="flex w-full items-center text-3 font-500 sm:w-fit">
              <p>{cropAddress(player.address)}</p>
              <div className="ml-1.5 h-[15px] rounded-3.5 bg-green-500 px-1 text-[8px] leading-[15px] text-white">
                YOU
              </div>
            </div>
            <div className="font-600">
              <span>{nanoToTon(player.total_bets)}</span>
              <span className="ml-1 text-muted-accent-foreground">
                {Coin.TON}
              </span>
            </div>
          </div>
        </>
      )}
    </Card>
  );
};

export default LeaderboardStatus;
