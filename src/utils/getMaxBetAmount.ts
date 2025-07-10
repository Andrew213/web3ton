import { Coin } from "@/typings/types";

export const getMaxBetAmount = (
  value: Coin,
  tonValue?: number,
  jettonValue?: number,
): number => {
  switch (value) {
    case Coin.TON:
      return Math.floor((tonValue ?? 0) * 10) / 10;
    case Coin.WEB3:
      return Math.floor((jettonValue ?? 0) * 10) / 10;
    default:
      return 0;
  }
};
