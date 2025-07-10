import { Address } from "@ton/core";
import { useTonAddress } from "@tonconnect/ui-react";
import { useUnit } from "effector-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Game } from "@/api/types";
import { $userStats } from "@/components/app/Header/components/WalletMenu/model";
import Notification from "@/components/app/Notification/Notification";
import PageWrapper from "@/components/app/PageWrapper/PageWrapper";
import { Card } from "@/components/ui/card";
import { GAMES_PER_PAGE } from "@/constants";
import { formatDateFromTimestamp, nanoToTon } from "@/lib/utils";
import HistoryFilters from "@/pages/History/components/HistoryFilters/HistoryFilters";
import {
  $filterHistoryByGameValue,
  $filterHistoryByResultValue,
} from "@/pages/History/components/HistoryFilters/model";
import HistoryTable from "@/pages/History/components/HistoryTable/HistroryTable";
import HistoryTableMobile from "@/pages/History/components/HistroryTableMobile/HistoryTableMobile";
import {
  $gamesHistory,
  $gamesHistoryError,
  $historyCurrentPage,
  fetchHistory,
  setTotalPages,
} from "@/pages/History/model";
import { nanoToJetton } from "@/utils/nanoToJetton";

export interface GameHistoryItem extends Omit<Game, "time"> {
  time: ReturnType<typeof formatDateFromTimestamp>;
}

const HistoryPage = () => {
  const [
    filterHistoryByResultValue,
    filterHistoryByGameValue,
    gamesHistory,
    historyCurrentPage,
    gamesHistoryError,
    userStats,
  ] = useUnit([
    $filterHistoryByResultValue,
    $filterHistoryByGameValue,
    $gamesHistory,
    $historyCurrentPage,
    $gamesHistoryError,
    $userStats,
  ]);

  const [history, setHistory] = useState<GameHistoryItem[] | null>();
  const userFriendlyAddress = useTonAddress();

  useEffect(() => {
    if (userFriendlyAddress) {
      fetchHistory({
        address: Address.parse(userFriendlyAddress),
        page: 1,
      });
    }
  }, [userFriendlyAddress, userStats]);

  function paginateHistory(
    historyData: Game[],
    historyPerPage: number,
    currentPage: number,
  ): Game[] {
    const startIndex = (currentPage - 1) * historyPerPage;
    const endIndex = startIndex + historyPerPage;
    return historyData.slice(startIndex, endIndex);
  }

  useEffect(() => {
    if (gamesHistory?.games?.length) {
      const filteredGames = gamesHistory.games
        .filter((game) => {
          switch (filterHistoryByResultValue) {
            case "1":
              return game.win_amount;
            case "2":
              return !game.win_amount;
            default:
              return true;
          }
        })
        .filter((game) => {
          switch (filterHistoryByGameValue) {
            case "1":
              return !game.mode;
            case "2":
              return game.mode;
            default:
              return true;
          }
        });

      setTotalPages(filteredGames.length);

      const userGames = paginateHistory(
        filteredGames,
        GAMES_PER_PAGE,
        historyCurrentPage,
      );

      const historyTransformed = userGames.map((el) => {
        return {
          ...el,
          time: formatDateFromTimestamp(el.time),
          bet_amount: el.is_ton
            ? nanoToTon(el.bet_amount)
            : nanoToJetton(el.bet_amount),
          win_amount: el.is_ton
            ? nanoToTon(el.win_amount)
            : nanoToJetton(el.win_amount),
        };
      });
      setHistory(historyTransformed);
    }
    if (gamesHistory?.games === null) {
      setHistory(null);
    }
  }, [
    filterHistoryByGameValue,
    filterHistoryByResultValue,
    gamesHistory,
    userFriendlyAddress,
    historyCurrentPage,
  ]);

  const { t } = useTranslation(`DATA_HISTORY_FILTERS`);

  if (gamesHistoryError) {
    return <Notification status="error" title={t`titleError`} />;
  }

  if (history === null) {
    return <Notification title={t`emptyTitle`} />;
  }

  return (
    <PageWrapper
      title={t`title`}
      rightSection={!!history && <HistoryFilters />}
    >
      <Card className="hidden border-none py-4 shadow-none max-sm:block">
        <HistoryTableMobile historyPageData={history} />
      </Card>
      <Card className="relative mt-4 w-full max-w-308 px-6 py-4 max-sm:hidden">
        <HistoryTable historyPageData={history} />
      </Card>
    </PageWrapper>
  );
};

export default HistoryPage;
