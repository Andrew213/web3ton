/* eslint-disable camelcase */
import {
  combine,
  createEffect,
  createEvent,
  createStore,
  sample,
} from "effector";

import { nanoToTon } from "@/lib/utils";
import { $gamesHistory } from "@/pages/History/model";
import { nanoToJetton } from "@/utils/nanoToJetton";

type Position = { x: number; y: number };

export const setCardPosition = createEvent<Position>();
export const $cardPosition = createStore<Position>({
  x: 50,
  y: 50,
}).on(setCardPosition, (_, value) => value);

export const startGame = createEvent<number>();

export const endGame = createEvent();
export const $gameStartedTimestamp = createStore<number | null>(null)
  .on(startGame, (_, timestamp) => timestamp)
  .on(endGame, () => null);

export type GameStatus = "success" | "lose" | "default" | "cashback";

export type GameResultT = {
  status: GameStatus;
  amount?: number;
};

export const $gameResult = createStore<GameResultT | null>(null).on(
  endGame,
  () => null,
);

export const $forceStop = createStore<boolean>(false).on(
  startGame,
  () => false,
);

const forceStop = createEffect(() => {
  const timeStampOfStart = $gameStartedTimestamp.getState();
  if (timeStampOfStart) {
    const currentTime = Date.now() / 1000;
    const forceStopTime = 2 * 60; // 2 минуты
    if (currentTime - timeStampOfStart >= forceStopTime) {
      return true; // Время вышло
    }
  }
  return false;
});

sample({
  clock: combine([$gameStartedTimestamp, $gamesHistory]),
  target: forceStop,
});

sample({
  clock: forceStop.doneData,
  filter: Boolean,
  target: [$forceStop, endGame],
});

sample({
  clock: combine([$gameStartedTimestamp, $gamesHistory]),
  filter(clk) {
    const timeStampOfStart = clk[0];
    if (clk[1]) {
      const timeStampOfGame = clk[1]?.games[0].time;

      if (timeStampOfStart && timeStampOfGame) {
        return timeStampOfGame > timeStampOfStart;
      }
    }
    return false;
  },
  fn: (clk) => {
    const { win_amount, is_ton, cashback } = clk[1]!.games[0];

    let status = win_amount > 0 ? "success" : "lose";

    if (cashback > 0) {
      status = "cashback";
    }

    const tonAmountOrCashback =
      cashback > 0 ? nanoToJetton(cashback).toFixed(0) : nanoToTon(win_amount);

    return {
      status,
      amount: is_ton ? tonAmountOrCashback : nanoToJetton(win_amount),
    } as GameResultT;
  },
  target: $gameResult,
});
