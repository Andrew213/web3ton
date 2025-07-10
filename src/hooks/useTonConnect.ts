import { SenderArguments } from "@ton/core";
import { useTonConnectUI } from "@tonconnect/ui-react";

export const useTonConnect = () => {
  const [tonConnectUI] = useTonConnectUI();

  return {
    sender: {
      send: async (args: SenderArguments) => {
        try {
          await tonConnectUI.sendTransaction({
            messages: [
              {
                address: args.to.toString(),
                amount: args.value.toString(),
                payload: args.body?.toBoc().toString("base64"),
              },
            ],
            validUntil: Date.now() + 5 * 60 * 1000,
          });
        } catch (err) {
          if (err instanceof Error) {
            throw new Error(err.message);
          }
        }
      },
    },
    connected: tonConnectUI.connected,
    address: tonConnectUI.wallet?.account.address,
    publicKey: tonConnectUI.wallet?.account.publicKey,
  };
};
