import { createEvent, createStore } from "effector";

export const setSpotLightBrighter = createEvent<boolean>();
export const $isSpotLightBrighter = createStore<boolean>(false).on(
  setSpotLightBrighter,
  (_, value) => value,
);
