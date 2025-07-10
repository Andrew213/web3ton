import { createEffect, createEvent, createStore, sample } from "effector";

import getRates from "@/api/requests/GetRates";

export const fetchRatesFx = createEffect(async (tokens: string) => {
  const response = await getRates(tokens);
  return response;
});

export const fetchRates = createEvent<string>();

sample({
  clock: fetchRates,
  target: fetchRatesFx,
});

export const $rates = createStore<number | null>(null)
  .on(
    fetchRatesFx.doneData,
    (_, response) =>
      response?.rates["EQBtcL4JA-PdPiUkB8utHcqdaftmUSTqdL8Z1EeXePLti_nK"].prices
        .TON,
  )
  .on(fetchRatesFx.failData, () => null)
  .reset(fetchRatesFx.fail);

export const $error = createStore<Error | null>(null)
  .on(fetchRatesFx.failData, (_, error) => error)
  .reset(fetchRatesFx.pending);

export const getRatesData = (tokens: string) => {
  fetchRatesFx(tokens);
  return {
    rates: $rates.getState(),
    isLoading: fetchRatesFx.pending.getState(),
    error: $error.getState(),
  };
};
