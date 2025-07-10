import { createEvent, createStore } from "effector";

export const filterHistoryByGame = createEvent<string>();

export const $filterHistoryByGameValue = createStore<string>("0").on(
  filterHistoryByGame,
  (_store, value) => value,
);

export const filterHistoryByResult = createEvent<string>();

export const $filterHistoryByResultValue = createStore<string>("0").on(
  filterHistoryByResult,
  (_store, value) => value,
);
