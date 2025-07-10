import { useUnit } from "effector-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import ArrowRightTop from "@/assets/icons/arrowRT.svg";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, nanoToTon } from "@/lib/utils";
import { cropAddress } from "@/utils/cropAddress";

import { getRankMedal } from "../GamesMenuSidebar/utils";
import { $firstFiveRating, fetchFirstFiveRating } from "./model";

const LeaderboardCard: React.FC = () => {
  const [firstFiveRating] = useUnit([$firstFiveRating]);

  useEffect(() => {
    fetchFirstFiveRating();
  }, []);

  const { t } = useTranslation(`DATA_LEADERBOARD_CARD`);

  return (
    <Card className="px-4 max-sm:border-none max-sm:shadow-none sm:px-0">
      <CardHeader className="max-sm:px-0">
        <CardTitle>{t`title`}</CardTitle>
        <Link
          to="/leaderboard"
          className="group flex items-center gap-2 hover:text-primary"
        >
          <span>{t`showAll`}</span>
          <ArrowRightTop className="stroke-foreground group-hover:stroke-primary" />
        </Link>
      </CardHeader>
      <CardContent className="max-sm:px-0">
        <div className="mb-2 flex justify-between text-3 text-muted-foreground">
          <p>{t`topPlayers`}</p>
          <p>{t`totalBet`}</p>
        </div>
        {firstFiveRating ? (
          <ul className="space-y-1.5">
            {firstFiveRating?.users.map((player) => (
              <li
                key={player.position}
                className={cn(
                  "flex justify-between rounded-50 p-1.75 pr-0",
                  {
                    1: "bg-1-rank-gradient",
                    2: "bg-2-rank-gradient",
                    3: "bg-3-rank-gradient",
                  }[player.position],
                )}
              >
                <div className="flex gap-2">
                  <div className="w-5">{getRankMedal(player.position)}</div>

                  <span>{cropAddress(player.address)}</span>
                </div>
                <div className="flex gap-1 font-semibold">
                  <span>{nanoToTon(player.total_bets)}</span>
                  <span className="text-muted-accent-foreground">TON</span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="space-y-1.5">
            {new Array(5).fill("").map((_el, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <li key={i}>
                <Skeleton className="h-[35px] w-full !rounded-50" />
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export { LeaderboardCard };
