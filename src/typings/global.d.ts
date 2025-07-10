/* eslint-disable no-unused-vars */
declare module "*.svg" {
  import * as React from "react";

  const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;

  export default ReactComponent;
}

interface ImportMeta {
  env: {
    VITE_WEB3_STEP?: number;
    VITE_TON_STEP?: number;
    VITE_API_URL?: string;
    VITE_TG_URL?: string;
    VITE_URL?: string;
    VITE_MAX_BET_COEFFICIENT?: number;
    VITE_NETWORK?: "TESTNET" | "MAINNET";
    VITE_GAME_CONTRACT?: string;
    VITE_JETTON_CONTRACT?: string;
  };
}

declare module "*.png";
