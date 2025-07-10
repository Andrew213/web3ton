import { Address } from "@ton/core";
import {
  createEffect,
  createEvent,
  createStore,
  restore,
  sample,
} from "effector";

import { GetUserStats } from "@/api/requests/GetUserStats";
import { GetUserStatsResponse } from "@/api/types";

export const fetchUserStats = createEvent<Address>();

export const $userStats = createStore<GetUserStatsResponse | null>(null);

export const $isUserStatsLoading = createStore(true);

export const fetchUserStatsFx = createEffect(async (address: Address) => {
  const response = await GetUserStats(address);
  return response?.data;
});

$isUserStatsLoading.on(fetchUserStatsFx.pending, (_, pending) => pending);

export const $fetchUserError = restore(fetchUserStatsFx.fail, null);

sample({
  clock: fetchUserStats,
  target: fetchUserStatsFx,
});

$userStats.on(fetchUserStatsFx.doneData, (_, stats) => stats);
