import { Address } from "@ton/core";
import { createEffect, createEvent, createStore, sample } from "effector";

import { GetGames } from "@/api/requests/GetGames";
import { GetGamesResponse } from "@/api/types";

type fetchHistory = {
  address?: Address;
  limit?: number;
  page?: number;
};

export const $allGamesHistory = createStore<GetGamesResponse | null>(null);

export const fetchAllHistory = createEvent<fetchHistory | undefined>();

export const fetchAllHistoryFx = createEffect(async (data?: fetchHistory) => {
  const response = await GetGames(data?.address, {
    limit: data?.limit,
    page: data?.page,
  });
  return response?.data;
});

sample({
  clock: fetchAllHistory,
  target: fetchAllHistoryFx,
});

$allGamesHistory.on(fetchAllHistoryFx.doneData, (_, history) => history);
