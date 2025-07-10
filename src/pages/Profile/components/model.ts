import { Address } from "@ton/core";
import {
  createEffect,
  createEvent,
  createStore,
  restore,
  sample,
} from "effector";

import { GetUserExperience } from "@/api/requests/GetUserExperience";
import { GetUserExperienceResponse } from "@/api/types";

export const fetchUserExperience = createEvent<Address>();

export const $userExperience = createStore<GetUserExperienceResponse | null>(
  null,
);

export const $isUserExperienceLoading = createStore(true);

export const fetchUserExperienceFx = createEffect(async (address: Address) => {
  const response = await GetUserExperience(address);
  return response?.data;
});

$isUserExperienceLoading.on(
  fetchUserExperienceFx.pending,
  (_, pending) => pending,
);

export const $fetchUserError = restore(fetchUserExperienceFx.fail, null);

sample({
  clock: fetchUserExperience,
  target: fetchUserExperienceFx,
});

$userExperience.on(
  fetchUserExperienceFx.doneData,
  (_, experience) => experience,
);
