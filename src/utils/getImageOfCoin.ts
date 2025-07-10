import { CoinTon, CoinWeb3 } from "@/assets/icons";
import { Coin } from "@/typings/types";

export const getImageOfCoin = (coin: Coin) =>
  coin === Coin.TON ? CoinTon : CoinWeb3;
