import { useTonAddress } from "@tonconnect/ui-react";
import { useUnit } from "effector-react";
import { useEffect, useMemo } from "react";

import { $gameResult } from "@/pages/Main/components/Card/model";

import { useJettonContract } from "./useJetton";
import { useMainContract } from "./useMainContract";
import useTonBalance from "./useTonBalance";

export const useMaxBet = () => {
  const wallet = useTonAddress();

  const { balance: balanceNative } = useMainContract();
  const {
    contractBalance: balanceJetton,
    getJettonBalance,
    userBalance,
  } = useJettonContract();
  const { tonBalance, getTonBalance } = useTonBalance();

  const [gameResult] = useUnit([$gameResult]);

  const MAX_BET_COEFFICIENT = import.meta.env.VITE_MAX_BET_COEFFICIENT || 1;

  useEffect(() => {
    if (gameResult) {
      getJettonBalance();
      getTonBalance();
    }
  }, [gameResult]);

  const maxTonBet = useMemo(
    () =>
      Math.min(
        tonBalance ?? 0,
        Math.round(balanceNative ?? 0 / MAX_BET_COEFFICIENT),
      ),
    [tonBalance, balanceNative, MAX_BET_COEFFICIENT],
  );

  const maxJettonBet = useMemo(
    () =>
      Math.min(
        Number(userBalance ?? 0),
        Math.round(balanceJetton ?? 0 / MAX_BET_COEFFICIENT ** 6),
      ),
    [userBalance, balanceJetton, MAX_BET_COEFFICIENT],
  );

  if (wallet) {
    return { maxJettonBet, maxTonBet };
  }
  return { maxJettonBet: balanceJetton, maxTonBet: balanceNative };
};
