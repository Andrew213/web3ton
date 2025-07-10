import { createEffect, createEvent, createStore, sample } from "effector";

import { GetGlobalRating } from "@/api/requests/GetGlobalRating";
import { GetGlobalRatingResponse } from "@/api/types";

export const $firstFiveRating = createStore<GetGlobalRatingResponse | null>(
  null,
);

export const fetchFirstFiveRating = createEvent();

export const fetchFirstFiveRatingFx = createEffect(async () => {
  const response = await GetGlobalRating({
    limit: 5,
    page: 1,
  });
  return response?.data;
});

sample({
  clock: fetchFirstFiveRating,
  target: fetchFirstFiveRatingFx,
});

$firstFiveRating.on(fetchFirstFiveRatingFx.doneData, (_, rating) => rating);
