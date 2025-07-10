import { Address } from "@ton/core";
import {
  createEffect,
  createEvent,
  createStore,
  restore,
  sample,
} from "effector";

import { GetGames } from "@/api/requests/GetGames";
import { GetGamesResponse } from "@/api/types";
import { GAMES_PER_PAGE } from "@/constants";

type fetchHistory = {
  address?: Address;
  limit?: number;
  page?: number;
};

export const $gamesHistory = createStore<GetGamesResponse | null>(null);

export const fetchHistory = createEvent<fetchHistory | undefined>();

export const setTotalPages = createEvent<number>();

export const $totalPages = createStore<number>(1).on(
  setTotalPages,
  (_, newValue) => Math.ceil(newValue / GAMES_PER_PAGE),
);

export const fetchHistoryFx = createEffect(async (data?: fetchHistory) => {
  const response = await GetGames(data?.address, {
    limit: data?.limit,
    page: data?.page,
  });
  return response?.data;
});

export const $isHistoryLoading = createStore(true);
$isHistoryLoading.on(fetchHistoryFx.pending, (_, pending) => pending);

sample({
  clock: fetchHistory,
  target: fetchHistoryFx,
});
$gamesHistory.on(fetchHistoryFx.doneData, (_, history) => history);

export const $gamesHistoryError = restore(fetchHistoryFx.fail, null);

export const setHistoryPage = createEvent<number>();
export const $historyCurrentPage = createStore(1).on(
  setHistoryPage,
  (_, page) => page,
);
