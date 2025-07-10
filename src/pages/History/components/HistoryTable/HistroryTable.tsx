/* eslint-disable camelcase */

import { useUnit } from "effector-react";
import { useTranslation } from "react-i18next";

import ShareGameResultModal from "@/components/app/ShareGameResult/ShareGameResultModal";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import HistoryPagination from "@/pages/History/components/HistoryPagination/HistoryPagination";
import { GameHistoryItem } from "@/pages/History/HistoryPage";
import { $isHistoryLoading } from "@/pages/History/model";
import { Coin } from "@/typings/types";
import { nanoToJetton } from "@/utils/nanoToJetton";

interface Props {
  historyPageData?: GameHistoryItem[] | null;
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
      <TableCell>
        <Skeleton className="h-4" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4" />
      </TableCell>
    </TableRow>
  ));
};

const HistoryTable: React.FC<Props> = ({ historyPageData }) => {
  const { t } = useTranslation(`DATA_HISTORY_TABLE`);

  const [loading] = useUnit([$isHistoryLoading]);

  return (
    <Table className={cn("h-full border-separate border-spacing-y-1 pb-9")}>
      <TableHeader>
        <TableRow>
          <TableHead>{t`headerDate`}</TableHead>
          <TableHead>{t`headerGame`}</TableHead>
          <TableHead className="text-right">{t`headerBet`}</TableHead>
          <TableHead className="text-right">{t`headerResult`}</TableHead>
          <TableHead className="text-right">{t`headerCashback`}</TableHead>
          <TableHead className="text-right">&#8203;</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading
          ? showLoading()
          : historyPageData?.map(
              ({
                id,
                is_ton,
                time,
                win_amount,
                bet_amount,
                mode,
                cashback,
              }) => {
                const { day, month, year, hours, minutes } = time;
                const currency = is_ton ? Coin.TON : Coin.WEB3;
                return (
                  <TableRow key={id} className="z-0 h-9">
                    <TableCell>
                      {`${day}.${month}.${year} `}
                      <span className="text-muted-foreground">{`${hours}:${minutes}`}</span>
                    </TableCell>
                    <TableCell className="w-[150px]">{`${t`Multiplication Magic`} x${mode ? 3 : 2}`}</TableCell>
                    <TableCell className="text-right">
                      {bet_amount}{" "}
                      <span className="font-600 text-muted-accent-foreground">
                        {currency}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="font-600 text-muted-accent-foreground">
                        <span className={cn(win_amount && "text-green-500")}>
                          {win_amount ? `+ ${win_amount}` : "0"}
                        </span>
                        {win_amount > 0 && (
                          <span className="font-600 text-muted-accent-foreground">
                            {is_ton ? ` ${Coin.TON}` : ` ${Coin.WEB3}`}
                          </span>
                        )}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="font-600 text-muted-accent-foreground">
                        {is_ton && cashback ? (
                          <span className={cn(cashback && "text-foreground")}>
                            {`+ ${nanoToJetton(cashback).toFixed(0)} `}
                            <span className="text-muted-accent-foreground">
                              {Coin.WEB3}
                            </span>
                          </span>
                        ) : (
                          "—"
                        )}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <ShareGameResultModal
                        isWin={win_amount > 0}
                        isTon={is_ton}
                        winAmount={win_amount}
                        betAmount={bet_amount}
                        gameMode={mode}
                        cashback={cashback}
                        id={id}
                      />
                    </TableCell>
                  </TableRow>
                );
              },
            )}

        {historyPageData && (
          <TableRow className="absolute left-0 mt-auto flex w-full justify-end bg-background">
            <TableCell>
              <HistoryPagination />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default HistoryTable;
