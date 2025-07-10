import { createEvent, createStore } from "effector";

import { Language } from "@/typings/types";

export const changeLanguage = createEvent<Language>();
export const $language = createStore("EN").on(
  changeLanguage,
  (_store, lang) => lang,
);
