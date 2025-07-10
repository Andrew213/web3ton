import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import MainLayout from "@/layouts/MainLayout/MainLayout";
import { RootLayout } from "@/layouts/RootLayout/RootLayout";
import NotFound from "@/pages/NotFound/NotFound";
import { mainRoutes, routes } from "@/routes/routes";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<RootLayout />}>
        <Route path="/" element={<MainLayout />}>
          {mainRoutes.map(({ path, Component }) => {
            return <Route key={path} path={path} element={<Component />} />;
          })}
        </Route>

        {routes.map(({ path, Component }) => {
          return <Route key={path} path={path} element={<Component />} />;
        })}

        <Route path="*" element={<NotFound />} />
      </Route>
    </Route>,
  ),
);
