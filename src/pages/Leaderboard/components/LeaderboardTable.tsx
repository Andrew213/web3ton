import { useUnit } from "effector-react";
import React from "react";
import { useTranslation } from "react-i18next";

import { Player } from "@/api/types";
import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";
import { getRankMedal } from "@/layouts/MainLayout/components/GamesMenuSidebar/utils";
import { cn, nanoToTon } from "@/lib/utils";
import { $isGlobalRatingLoading } from "@/pages/Leaderboard/model";
import { Coin } from "@/typings/types";
import { cropAddress } from "@/utils/cropAddress";

import LeaderboardPagination from "./LeaderboardPagination";

interface ILeaderboardTable {
  players: Player[];
  targetPosition: number | undefined;
}

const showLoading = () => {
  return new Array(8).fill("").map((_el, i) => (
    <TableRow key={`key-${1 + i}`}>
      <TableCell>
        <Skeleton className="h-4" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4" />
      </TableCell>
    </TableRow>
  ));
};

const LeaderboardTable: React.FC<ILeaderboardTable> = ({
  players,
  targetPosition,
}) => {
  const [loading] = useUnit([$isGlobalRatingLoading]);

  const { t } = useTranslation("DATA_LEADERBOARD_PAGE");

  return (
    <div className="border-separate border-spacing-y-1">
      <div className="text-sm py-[6px] text-muted-foreground">
        <div className="flex w-full flex-row px-2">
          <div className="w-10 sm:w-[100px]">{t`rank`}</div>
          <div className="min-w-[40%]">{t`player`}</div>
          <div>{t`totalBet`}</div>
        </div>
      </div>
      <div>
        <div className="pb-15 lg:pb-12">
          {loading
            ? showLoading()
            : players.map((player) => (
                <div
                  key={player.position}
                  className="relative z-0 mb-1 flex h-9 items-center px-2"
                >
                  <div className="w-10 sm:w-[100px]">
                    {getRankMedal(player.position)}
                  </div>
                  <div className="relative flex min-w-[40%] flex-row items-center text-3 font-500">
                    <span>{cropAddress(player.address)}</span>

                    {player.position === targetPosition && (
                      <div className="ml-2 h-[15px] rounded-3.5 bg-green-500 px-1 text-[8px] leading-[15px] text-white">
                        YOU
                      </div>
                    )}
                  </div>
                  <div className="text-3 font-600">
                    <div
                      className={cn(
                        "absolute left-0 top-0 z-[-1] h-full w-full rounded-4",
                        {
                          1: "bg-1-rank-gradient",
                          2: "bg-2-rank-gradient",
                          3: "bg-3-rank-gradient",
                        }[player.position],
                        { "bg-target/10": player.position === targetPosition },
                      )}
                    />

                    <span>{nanoToTon(player.total_bets)}</span>
                    <span className="ml-1 text-muted-accent-foreground">
                      {Coin.TON}
                    </span>
                  </div>
                </div>
              ))}
        </div>
        {players?.length && (
          <div className="fixed bottom-0 left-0 mt-auto flex w-full justify-end rounded-4 bg-background pb-6 md:absolute md:pb-4">
            <div>
              <LeaderboardPagination />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaderboardTable;
