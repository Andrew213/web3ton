import { useUnit } from "effector-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, nanoToTon } from "@/lib/utils";
import { Coin } from "@/typings/types";
import { cropAddress } from "@/utils/cropAddress";
import { nanoToJetton } from "@/utils/nanoToJetton";

import { $allGamesHistory, fetchAllHistory } from "./model";

const HistoryCard: React.FC = () => {
  const [gamesHistory] = useUnit([$allGamesHistory]);

  const { t } = useTranslation("DATA_HISTORY_CARD");

  useEffect(() => {
    fetchAllHistory({
      limit: 11,
      page: 1,
    });
  }, []);

  return (
    <Card className="max-h-full overflow-hidden max-sm:border-none max-sm:shadow-none">
      <CardHeader className="max-sm:hidden">
        <CardTitle>{t`title`}</CardTitle>
      </CardHeader>
      <CardContent className="relative px-0 pb-0">
        <div className="w-full text-left">
          <div className="mb-2 grid grid-cols-[86px_1fr_16px_1fr_1fr] gap-2 px-5 text-right text-3 font-medium text-muted-foreground sm:grid-cols-[54px_1fr_16px_1fr_1fr] lg:grid-cols-[88px_1fr_1fr_1fr_1fr] lg:gap-0">
            <div className="text-left">{t`player`}</div>
            <div>{t`bet`}</div>
            <div>&#8203;</div>
            <div>{t`profit`}</div>
            <div>{t`cashback`}</div>
          </div>

          <div className="max-h-100 overflow-y-hidden">
            {gamesHistory?.games ? (
              gamesHistory?.games.map((history) => {
                let isNew = false;
                const now = Math.floor(Date.now() / 1000);
                const gameTimeDiff = now - history.time;
                if (gameTimeDiff <= 30) {
                  // если записи менее 30 сек, считаю за новую
                  isNew = true;
                }
                return (
                  <div
                    className={cn(
                      isNew && "highlighted",
                      history.win_amount > 0 && "bg-profit",
                      "relative grid h-9 grid-cols-[86px_1fr_16px_1fr_1fr] gap-2 px-5 text-right text-3 font-medium sm:grid-cols-[54px_1fr_16px_1fr_1fr] lg:grid-cols-[88px_1fr_1fr_1fr_1fr] lg:gap-0",
                    )}
                    key={history.id}
                  >
                    <div className="py-2 text-left sm:max-w-[54px] sm:truncate lg:max-w-full">
                      {cropAddress(history.address)}
                    </div>
                    <div className="py-2">
                      {history.is_ton
                        ? nanoToTon(history.bet_amount)
                        : nanoToJetton(history.bet_amount)}
                      <span className="ml-0.5 text-[10px] text-muted-foreground">
                        {history.is_ton ? "TON" : "WEB3"}
                      </span>
                    </div>
                    <div className="mx-auto py-2">
                      <span
                        className={`leading-3 w-6 rounded-[5px] text-center font-600 ${history.mode === 0 ? "bg-primary" : "bg-skyblue"} h-[12px] px-0.75 py-[1.5px] text-[7.5px] text-white`}
                      >
                        X{history.mode ? 3 : 2}
                      </span>
                    </div>
                    <div className="py-2">
                      {history.is_ton
                        ? nanoToTon(history.win_amount)
                        : nanoToJetton(history.win_amount)}
                    </div>
                    <div className="flex justify-end py-2">
                      {history.is_ton && history.cashback ? (
                        <>
                          <span>
                            {Number(nanoToJetton(history.cashback)).toFixed(0)}
                          </span>
                          <span className="ml-1 text-[10px] font-semibold text-muted-foreground">
                            {Coin.WEB3}
                          </span>
                        </>
                      ) : (
                        <span className="text-muted-foreground">&mdash;</span>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <ul className="mb-4 space-y-1.5">
                {new Array(9).fill("").map((_el, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <li key={i}>
                    <Skeleton className="mx-5 h-6" />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HistoryCard;
