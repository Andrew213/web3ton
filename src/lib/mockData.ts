import { Coin } from "@/typings/types";

export const leaderboardData = [
  {
    id: 1,
    rank: 1,
    player: "UQDT…36A4",
    bet: 5480,
  },
  {
    id: 2,
    rank: 2,
    player: "UQDT…36A4",
    bet: 5480,
  },
  {
    id: 3,
    rank: 3,
    player: "UQDT…36A4",
    bet: 5480,
  },
  {
    id: 4,
    rank: 4,
    player: "UQDT…36A4",
    bet: 5480,
  },
  {
    id: 5,
    rank: 5,
    player: "UQDT...36A4",
    bet: 5480,
  },
];

export const historyData = [
  {
    id: 1,
    player: "UQDT…36A4",
    bet: 69,
    multiplier: 2,
    profit: 123.58,
    cashback: 2.63,
  },
  {
    id: 2,
    player: "BYVU…U2OX",
    bet: 66,
    multiplier: 3,
    profit: null,
    cashback: null,
  },
  {
    id: 3,
    player: "6833…8EYU",
    bet: 47,
    multiplier: 2,
    profit: 132.31,
    cashback: 4.15,
  },
  {
    id: 4,
    player: "M51R…T9YA",
    bet: 21,
    multiplier: 2,
    profit: null,
    cashback: null,
  },
  {
    id: 5,
    player: "GSZ0…XV0Y",
    bet: 59,
    multiplier: 2,
    profit: 141.4,
    cashback: null,
  },
  {
    id: 6,
    player: "X8BM…DWOK",
    bet: 77,
    multiplier: 2,
    profit: null,
    cashback: null,
  },
  {
    id: 7,
    player: "50TI…JMN8",
    bet: 73,
    multiplier: 3,
    profit: 196.37,
    cashback: 3.88,
  },
  {
    id: 8,
    player: "N42E…NSQK",
    bet: 62,
    multiplier: 2,
    profit: 156.25,
    cashback: 4.8,
  },
  {
    id: 9,
    player: "TL1C…U507",
    bet: 40,
    multiplier: 3,
    profit: 67.31,
    cashback: null,
  },
  {
    id: 10,
    player: "8R2L…F0C4",
    bet: 63,
    multiplier: 3,
    profit: null,
    cashback: 1.31,
  },
  {
    id: 11,
    player: "6KTN…PSWU",
    bet: 69,
    multiplier: 3,
    profit: 123.58,
    cashback: 2.63,
  },
  {
    id: 12,
    player: "BYVU…U2OX",
    bet: 66,
    multiplier: 3,
    profit: 117.3,
    cashback: null,
  },
  {
    id: 13,
    player: "6833…8EYU",
    bet: 47,
    multiplier: 3,
    profit: null,
    cashback: 4.15,
  },
  {
    id: 14,
    player: "M51R…T9YA",
    bet: 21,
    multiplier: 2,
    profit: null,
    cashback: null,
  },
  {
    id: 15,
    player: "GSZ0…XV0Y",
    bet: 59,
    multiplier: 3,
    profit: 141.4,
    cashback: null,
  },
  {
    id: 16,
    player: "X8BM…DWOK",
    bet: 77,
    multiplier: 2,
    profit: null,
    cashback: null,
  },
  {
    id: 17,
    player: "50TI…JMN8",
    bet: 73,
    multiplier: 2,
    profit: 888.88,
    cashback: 3.88,
  },
  {
    id: 18,
    player: "N42E…NSQK",
    bet: 62,
    multiplier: 2,
    profit: null,
    cashback: 4.8,
  },
  {
    id: 19,
    player: "TL1C…U507",
    bet: 40,
    multiplier: 3,
    profit: 67.31,
    cashback: 2.7,
  },
  {
    id: 20,
    player: "8R2L…F0C4",
    bet: 63,
    multiplier: 3,
    profit: null,
    cashback: 1.31,
  },
];
export const GAME_RULES: Record<
  Coin,
  Partial<Record<2 | 3, { chance: string; cashback?: number }>>
> = {
  [Coin.TON]: {
    2: {
      chance: "40%",
      cashback: 30,
    },
  },
  [Coin.WEB3]: {
    2: {
      chance: "45%",
    },
    3: {
      chance: "25%",
    },
  },
};

export type history = {
  date: number;
  bet_amount: number;
  win_amount: number;
  id: number;
  mode: "x3" | "x2";
  is_ton: boolean;
};

export const historyPageData: history[] = [
  {
    id: 1,
    date: 1716554520000,
    mode: "x2",
    is_ton: true,
    bet_amount: 80,
    win_amount: 160,
  },
  {
    id: 2,
    date: 1716554520000,
    mode: "x2",
    is_ton: true,
    bet_amount: 80,
    win_amount: 160,
  },
  {
    id: 3,
    date: 1716554520000,
    mode: "x2",
    is_ton: true,
    bet_amount: 80,
    win_amount: 160,
  },
  {
    id: 4,
    date: 1716554520000,
    mode: "x2",
    is_ton: true,
    bet_amount: 80,
    win_amount: 160,
  },
  {
    id: 5,
    date: 1716554520000,
    mode: "x2",
    is_ton: false,
    bet_amount: 80,
    win_amount: 10,
  },
  {
    id: 6,
    date: 1716554520000,
    mode: "x2",
    is_ton: true,
    bet_amount: 80,
    win_amount: 160,
  },
  {
    id: 7,
    date: 1716554520000,
    mode: "x2",
    is_ton: false,
    bet_amount: 80,
    win_amount: 10,
  },
  {
    id: 8,
    date: 1716554520000,
    mode: "x2",
    is_ton: true,
    bet_amount: 80,
    win_amount: 160,
  },
];
