import { useUnit } from "effector-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { $userStats } from "@/components/app/Header/components/WalletMenu/model";
import Notification from "@/components/app/Notification/Notification";
import PageWrapper from "@/components/app/PageWrapper/PageWrapper";
import { Card } from "@/components/ui/card";
import { GAMES_PER_PAGE } from "@/constants";

import CurrentPlayerRow from "./components/CurrentPlayerRow";
import LeaderboardStatus from "./components/LeaderboardStatus";
import LeaderboardTable from "./components/LeaderboardTable";
import PrizesModal from "./components/PrizesModal";
import {
  $gamesGlobalRating,
  $globalRatingCurrentPage,
  $globalRatingError,
  fetchGlobalRating,
} from "./model";

const LeaderboardPage: React.FC = () => {
  const { t } = useTranslation(`DATA_LEADERBOARD_PAGE`);
  const [gamesGlobalRating, globalRatingCurrentPage, globalRatingError] =
    useUnit([$gamesGlobalRating, $globalRatingCurrentPage, $globalRatingError]);
  const [userStats] = useUnit([$userStats]);

  const userPosition = userStats?.position;

  const getPlayer = () => {
    if (gamesGlobalRating?.users && userPosition) {
      return gamesGlobalRating.users[userPosition - 1];
    }
    return null;
  };
  const player = getPlayer();

  const shouldShowCurrent = (
    position: number | undefined,
    gamesPerPage: number,
    currentPageIndex: number,
  ): boolean => {
    if (position) {
      return (
        (position > gamesPerPage &&
          position <= gamesPerPage * currentPageIndex) ||
        position > gamesPerPage
      );
    }

    return false;
  };

  const isShowCurrent = shouldShowCurrent(
    userPosition,
    GAMES_PER_PAGE,
    globalRatingCurrentPage,
  );

  useEffect(() => {
    fetchGlobalRating({
      limit: GAMES_PER_PAGE,
      page: globalRatingCurrentPage,
    });
  }, [globalRatingCurrentPage]);

  if (globalRatingError) {
    return <Notification status="error" title={t`titleError`} />;
  }

  return (
    <PageWrapper title={t(`title`)} rightSection={<PrizesModal />}>
      {isShowCurrent && <CurrentPlayerRow player={player} />}
      {userPosition !== undefined && userPosition > 99 && (
        <LeaderboardStatus player={player} />
      )}
      <Card className="relative mt-4 w-full max-w-308 max-sm:border-none max-sm:shadow-none sm:px-6 sm:py-4">
        {gamesGlobalRating?.users && (
          <LeaderboardTable
            targetPosition={userPosition}
            players={gamesGlobalRating.users}
          />
        )}
      </Card>
    </PageWrapper>
  );
};

export default LeaderboardPage;
