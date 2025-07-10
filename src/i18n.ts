import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { DATA_WALLET_MENU } from "@/components/app/Header/components/WalletMenu/constants";
import { DATA_NOTIFICATION } from "@/components/app/Notification/constants";
import { DATA_SHARE_GAME_RESULT } from "@/components/app/ShareGameResult/constants";
import { DATA_GAME_INFO_CARD } from "@/layouts/MainLayout/components/GameInfo/constants";
import { DATA_HISTORY_CARD } from "@/layouts/MainLayout/components/History/constants";
import { DATA_INFO_SIDEBAR } from "@/layouts/MainLayout/components/InfoSidebar/constants";
import { DATA_LEADERBOARD_CARD } from "@/layouts/MainLayout/components/Leaderboard/constants";
import { DATA_LANGUAGE_MODAL } from "@/layouts/MainLayout/components/MobileSidebar/components/constants";
import { DATA_MOBILE_SIDEBAR } from "@/layouts/MainLayout/components/MobileSidebar/constatns";
import { DATA_USER_BALANCE_CARD } from "@/layouts/MainLayout/components/UserBalance/constants";
import { DATA_HISTORY_TABLE } from "@/pages/History/components/HistoryTable/constants";
import { DATA_HISTORY_FILTERS } from "@/pages/History/constants";
import { DATA_LEADERBOARD_PAGE } from "@/pages/Leaderboard/constants";
import { DATA_BOTTOM_CONTROL } from "@/pages/Main/components/BottomControl/constants";
import { DATA_CARD } from "@/pages/Main/components/Card/constants";
import { DATA_RULES_MODAL } from "@/pages/Main/components/RulesModal/constants";
import { DATA_MAIN_PAGE } from "@/pages/Main/constants";
import { DATA_NOTFOUND_PAGE } from "@/pages/NotFound/constants";
import { DATA_PROFILE_PAGE } from "@/pages/Profile/constants";
import { DATA_MENU_SIDEBAR } from "@/routes/constants";
import { generateNamespaces, generateResources } from "@/utils/translate";

import { DATA_REFERRALS_CARD } from "./pages/Profile/components/ReferralsCard/constants";

const allData = [
  { DATA_MAIN_PAGE },
  { DATA_LEADERBOARD_PAGE },
  { DATA_BOTTOM_CONTROL },
  { DATA_RULES_MODAL },
  { DATA_MENU_SIDEBAR },
  { DATA_LEADERBOARD_CARD },
  { DATA_INFO_SIDEBAR },
  { DATA_HISTORY_CARD },
  { DATA_GAME_INFO_CARD },
  { DATA_LEADERBOARD_PAGE },
  { DATA_WALLET_MENU },
  { DATA_MOBILE_SIDEBAR },
  { DATA_HISTORY_FILTERS },
  { DATA_HISTORY_TABLE },
  { DATA_PROFILE_PAGE },
  { DATA_CARD },
  { DATA_LANGUAGE_MODAL },
  { DATA_NOTIFICATION },
  { DATA_NOTFOUND_PAGE },
  { DATA_USER_BALANCE_CARD },
  { DATA_SHARE_GAME_RESULT },
  { DATA_REFERRALS_CARD },
];
const ns = generateNamespaces(allData);
const resources = generateResources(allData);

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    EN: {
      ...resources.en,
      translation: {
        previous: "Previous",
        next: "Next",
        theme: "Dark mode",
        russian: "Russian",
        joinChannel: "Join our Telegram!",
      },
    },
    RU: {
      ...resources.ru,
      translation: {
        previous: "Предыдущая",
        next: "Следующая",
        theme: "Тёмная тема",
        russian: "Русский",
        joinChannel: "Мы в Telegram!",
      },
    },
  },
  ns: ["translation", ...ns],
  defaultNS: "mainPage",
});

export default i18n;
