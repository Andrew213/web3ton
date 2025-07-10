/* eslint-disable camelcase */
import { useUnit } from "effector-react";
import { useTranslation } from "react-i18next";

import Notification from "@/components/app/Notification/Notification";
import ShareGameResultModal from "@/components/app/ShareGameResult/ShareGameResultModal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import HistoryPagination from "@/pages/History/components/HistoryPagination/HistoryPagination";
import { GameHistoryItem } from "@/pages/History/HistoryPage";
import { $isHistoryLoading } from "@/pages/History/model";
import { Coin } from "@/typings/types";
import { nanoToJetton } from "@/utils/nanoToJetton";

interface Props {
  historyPageData?: GameHistoryItem[] | null;
}

const HistoryTableMobile: React.FC<Props> = ({ historyPageData }) => {
  const { t } = useTranslation(`DATA_HISTORY_TABLE`);

  const [loading] = useUnit([$isHistoryLoading]);

  const getCoinType = (isTon: boolean, winAmount: number, cashback: number) => {
    switch (true) {
      case isTon && winAmount > 0:
        return (
          <>
            <span className="text-green-500">{`+ ${winAmount} `}</span>
            <span className="font-600 text-muted-accent-foreground">
              {Coin.TON}
            </span>
          </>
        );
      case !isTon && winAmount > 0:
        return (
          <>
            <span className="text-green-500">{`+ ${winAmount} `}</span>
            <span className="font-600 text-muted-accent-foreground">
              {Coin.WEB3}
            </span>
          </>
        );
      case isTon && cashback > 0:
        return (
          <>
            <span className="text-green-500">{`+ ${nanoToJetton(cashback).toFixed(0)} `}</span>
            <span className="font-600 text-muted-accent-foreground">
              {Coin.WEB3}
            </span>
          </>
        );
      default:
        return 0;
    }
  };

  if (historyPageData === null) {
    return (
      <div className="absolute left-1/2 top-1/2 min-w-[280px] -translate-x-1/2 -translate-y-1/2">
        <Notification title={t`emptyTitle`} />
      </div>
    );
  }

  const showLoading = () => {
    return new Array(8).fill("").map((_el, i) => {
      return (
        // eslint-disable-next-line react/no-array-index-key
        <div key={i} className="flex justify-start gap-6 py-2 text-3">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-2 w-20" />
            <Skeleton className="h-2 w-20" />
          </div>
          <div className="flex-grow">
            <Skeleton className="ml-auto mr-10 h-2 w-10" />
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <div className="flex items-center justify-between py-[6px] pr-10 text-3 text-muted-foreground">
        <span>{t`headerGame`}</span>
        <span>{t`headerResult`}</span>
      </div>
      <Accordion type="single" collapsible>
        {loading
          ? showLoading()
          : historyPageData?.map(
              ({
                id,
                time,
                mode,
                bet_amount,
                win_amount,
                is_ton,
                cashback,
              }) => {
                const { day, month, year, hours, minutes } = time;
                const currency = is_ton ? Coin.TON : Coin.WEB3;
                return (
                  <AccordionItem value={String(id)} key={id}>
                    <AccordionTrigger className="flex justify-start gap-6 py-2 text-3">
                      <div className="flex flex-col gap-1">
                        <span>{`Multip. Magic x${mode ? 3 : 2}`}</span>
                        <span className="text-muted-foreground">
                          {" "}
                          {`${day}.${month}.${year} ${hours}:${minutes}`}
                        </span>
                      </div>
                      <div className="flex-grow text-right">
                        <span className="font-600 text-muted-accent-foreground">
                          {getCoinType(is_ton, win_amount, cashback)}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-2 bg-history p-3 text-3">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          {t`headerBet`}
                        </span>
                        <div>
                          {bet_amount}
                          <span className="font-600 text-muted-accent-foreground">
                            {` ${currency}`}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          {t`headerCashback`}
                        </span>
                        <div>
                          <span className="font-600 text-muted-accent-foreground">
                            {is_ton && cashback ? (
                              <span
                                className={cn(cashback && "text-foreground")}
                              >
                                {cashback > 0
                                  ? `+ ${nanoToJetton(cashback).toFixed(0)} `
                                  : 0}
                                <span className="text-muted-accent-foreground">
                                  {Coin.WEB3}
                                </span>
                              </span>
                            ) : (
                              "—"
                            )}
                          </span>
                        </div>
                      </div>
                      <ShareGameResultModal
                        isWin={win_amount > 0}
                        isTon={is_ton}
                        winAmount={win_amount}
                        betAmount={bet_amount}
                        gameMode={mode}
                        cashback={cashback}
                        id={id}
                        className="bg-share-button stroke-share-text text-share-text"
                      />
                    </AccordionContent>
                  </AccordionItem>
                );
              },
            )}
      </Accordion>
      {historyPageData?.length && (
        <HistoryPagination className="fixed bottom-0 w-full bg-background pb-6 pr-4 pt-[6px]" />
      )}
    </>
  );
};

export default HistoryTableMobile;
