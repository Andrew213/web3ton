import "./index.css";
import "./i18n";

import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import ErrorBoundary from "@/core/ErrorBoundary";
import { ThemeProvider } from "@/core/providers/ThemeProviderContext";
import { router } from "@/routes/index";

const manifestURL = new URL(
  "tonconnect-manifest.json",
  window.location.href,
).toString();

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <TonConnectUIProvider manifestUrl={manifestURL}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </TonConnectUIProvider>
  </ErrorBoundary>,
);
