import { Address } from "@ton/core";
import { createEffect, createEvent, createStore, sample } from "effector";

import { GetWhiteList } from "@/api/requests/GetWhitelist";
import { Coin } from "@/typings/types";

export const clickX2 = createEvent();
export const clickX3 = createEvent();

export const $multiplier = createStore<2 | 3>(2)
  .on(clickX2, () => 2)
  .on(clickX3, () => 3);

export const clickTon = createEvent();
export const clickWeb3 = createEvent();
export const $coin = createStore<Coin>(Coin.TON)
  .on(clickTon, () => Coin.TON)
  .on(clickWeb3, () => Coin.WEB3);

export const changed = createEvent<string>();
export const onBlur = createEvent();
export const $amount = createStore<string>("1")
  .on(changed, (_, val) => {
    // TODO: подставлять MIN AMOUNT ВЫНЕСТИ В ENV
    if (parseInt(val, 10) < 1) return "1";
    return val;
  })
  .on(onBlur, (store) => {
    // TODO: подставлять MIN AMOUNT ВЫНЕСТИ В ENV
    if (!store.length) return "1";
  });

export const fetchWhitelist = createEvent<Address>();

export const $isWhitelisted = createStore<boolean>(false);

export const fetchWhitelistFx = createEffect(async (address: Address) => {
  const response = await GetWhiteList(address);
  return response?.data;
});

sample({
  clock: fetchWhitelist,
  target: fetchWhitelistFx,
});

$isWhitelisted.on(fetchWhitelistFx.doneData, (_, data) => data?.whitelisted);
