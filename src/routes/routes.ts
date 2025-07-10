import HistoryPage from "@/pages/History/HistoryPage";
import LeaderboardPage from "@/pages/Leaderboard/LeaderboardPage";
import Main from "@/pages/Main/Main";
import ProfilePage from "@/pages/Profile/ProfilePage";
import { DATA_MENU_SIDEBAR } from "@/routes/constants";

type TRoutePath = "/" | "/profile/:userId" | "/leaderboard" | "/history";
type TRouteName = "main" | "profile" | "leaderboard" | "history";

export const menuRoutes: Record<TRouteName, TRoutePath> = {
  main: "/",
  profile: "/profile/:userId",
  leaderboard: "/leaderboard",
  history: "/history",
};

interface Route {
  path: TRoutePath;
  Component: React.ComponentType;
  title?: string;
}

export const mainRoutes: Route[] = [
  {
    path: menuRoutes.main,
    Component: Main,
    title: DATA_MENU_SIDEBAR.en.main,
  },
];

export const routes: Route[] = [
  {
    path: menuRoutes.leaderboard,
    Component: LeaderboardPage,
  },
  {
    path: menuRoutes.history,
    Component: HistoryPage,
  },
  {
    path: menuRoutes.profile,
    Component: ProfilePage,
  },
];
