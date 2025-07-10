import {
  createEffect,
  createEvent,
  createStore,
  restore,
  sample,
} from "effector";

import { GetGlobalRating } from "@/api/requests/GetGlobalRating";
import { GetGlobalRatingResponse } from "@/api/types";

type fetchGlobalRating = {
  limit?: number;
  page?: number;
};

export const $gamesGlobalRating = createStore<GetGlobalRatingResponse | null>(
  null,
);

export const $isGlobalRatingLoading = createStore(true);

export const fetchGlobalRating = createEvent<fetchGlobalRating | undefined>();

export const fetchGamesGlobalRatingFx = createEffect(
  async (data?: fetchGlobalRating) => {
    const response = await GetGlobalRating({
      limit: data?.limit,
      page: data?.page,
    });
    return response?.data;
  },
);

export const $globalRatingError = restore(fetchGamesGlobalRatingFx.fail, null);

sample({
  clock: fetchGlobalRating,
  target: fetchGamesGlobalRatingFx,
});

$gamesGlobalRating.on(fetchGamesGlobalRatingFx.doneData, (_, rating) => rating);

$isGlobalRatingLoading.on(
  fetchGamesGlobalRatingFx.pending,
  (_, pending) => pending,
);

export const setGlobalRatingPage = createEvent<number>();
export const $globalRatingCurrentPage = createStore(1).on(
  setGlobalRatingPage,
  (_, page) => page,
);
