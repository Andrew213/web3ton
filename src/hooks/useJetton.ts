import { Address, beginCell, toNano } from "@ton/core";
import { AssetsSDK, createApi } from "@ton-community/assets-sdk";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { useCallback, useEffect, useState } from "react";

import { bigToNumber } from "@/lib/utils";
import { nanoToJetton } from "@/utils/nanoToJetton";

import { TonConnectSender } from "./tonConnectSender";
import { useTonClient } from "./useTonClient";

type GameMode = 2 | 3;

const NETWORK =
  import.meta.env.VITE_NETWORK === "MAINNET" ? "mainnet" : "testnet";

const JETTON_CONTRACT = import.meta.env.VITE_JETTON_CONTRACT || "";

export const useJettonContract = () => {
  const [contractBalance, setContractBalance] = useState<number>();
  const [userBalance, setUserBalance] = useState<string | null>("");
  const [loading, setLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  const client = useTonClient();
  const [provider] = useTonConnectUI();

  const sender = new TonConnectSender(provider);

  const JETTON_TRANSFER = 0x0f8a7ea5;
  const BET_X2 = 0x6562bc7c;
  const BET_X3 = 0x76b052e6;

  const getAddress = async () => {
    const api = await createApi(NETWORK);

    const sdk = AssetsSDK.create({
      api,
      sender,
    });

    if (sender.address) {
      const jettonMaster = sdk.openJetton(Address.parse(JETTON_CONTRACT));
      const jettonWallet = (await jettonMaster.getWallet(sender.address))
        .address;

      return jettonWallet;
    }
  };

  const sendJetton = async (betAmount: number, gameMode: GameMode = 2) => {
    const FORWARD_TON_AMOUNT = toNano("0.05"); // Amount to forward with each transfer
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const betOpcode = gameMode === 2 ? BET_X2 : BET_X3;
    const forwardPayload = beginCell()
      .storeUint(betOpcode, 32)
      .storeUint(currentTimestamp, 32)
      .endCell();
    const jettonWallet = await getAddress();
    const gameContract = import.meta.env.VITE_GAME_CONTRACT || "";
    // Create Jetton transfer body
    const transferBody = beginCell()
      .storeUint(JETTON_TRANSFER, 32) // op
      .storeUint(0, 64) // query_id
      .storeCoins(betAmount) // amount
      .storeAddress(Address.parse(gameContract)) // destination
      .storeAddress(sender.address!) // response_destination
      .storeUint(0, 1) // custom_payload
      .storeCoins(FORWARD_TON_AMOUNT) // forward_ton_amount
      .storeUint(1, 1)
      .storeRef(forwardPayload) // forward_payload reference
      .endCell();
    try {
      if (jettonWallet) {
        await sender.send({
          to: jettonWallet,
          value: toNano("0.1"),
          body: transferBody,
        });
        return "ok";
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };

  const getJettonBalance = useCallback(async () => {
    const jettonUserAddress = await getAddress();

d
    try {
      setLoading(true);

      const data = (
        await client.runMethod(jettonUserAddress, "get_wallet_data")
      ).stack;
      const jettonBalance = nanoToJetton(
        bigToNumber(data.readBigNumber()),
      ).toFixed(2);

      setUserBalance(jettonBalance);
      setLoading(false);
    } catch (error) {
      if (retryCount < 5) {
        console.error(
          `Error fetching jetton balance (attempt ${retryCount + 1}`,
          error,
        );
        setTimeout(() => {
          setRetryCount((prevCount) => prevCount + 1);
        }, 2000); // если ошибка, делаю повторный запрос
      } else {
        console.error(`Final Error fetching jetton balance`, error);
        setUserBalance(null);
        setLoading(false);
      }
    }
  }, [client, retryCount]);

  const getContractBalance = async () => {
    if (!client) {
      return;
    }
    const jettonMasterAddress = Address.parse(JETTON_CONTRACT);
    const data = (
      await client.runMethod(jettonMasterAddress, "get_jetton_data")
    ).stack;

    const jettonBalance = nanoToJetton(bigToNumber(data.readBigNumber()));

    setContractBalance(jettonBalance);
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    if (client) {
      getContractBalance();
      intervalId = setInterval(getContractBalance, 10000); // перезапрашиваю баланс жетонов каждые 10 сек
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [client]);

  useEffect(() => {
    if (client) {
      getJettonBalance();
    }
  }, [client, getJettonBalance]);

  return {
    sendJetton: async (betAmount: number, gameMode: GameMode) => {
      try {
        const response = await sendJetton(betAmount, gameMode);
        return response;
      } catch (err) {
        if (err instanceof Error) {
          throw new Error(err.message);
        }
      }
    },
    contractBalance,
    userBalance,
    isLoadingUserBalance: loading,
    getJettonBalance,
  };
};
