import { getHttpEndpoint } from "@orbs-network/ton-access";
import { TonClient } from "@ton/ton";

import { useAsyncInitialize } from "@/hooks/useAsyncInitialize";

export function useTonClient() {
  return useAsyncInitialize(
    async () => {
      try {
        const network =
          import.meta.env.VITE_NETWORK === "MAINNET" ? "mainnet" : "testnet";
        const endpoint = await getHttpEndpoint({ network });
        return new TonClient({ endpoint });
      } catch (err) {
        console.error("Failed to get HTTP endpoint:", err);
      }
    },
    [],
    2000,
  );
}
