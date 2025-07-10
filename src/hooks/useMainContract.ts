import { Address, OpenedContract } from "@ton/core";
import { useEffect, useState } from "react";

import { MainContract } from "@/contract/MainContract";
import { useAsyncInitialize } from "@/hooks/useAsyncInitialize";
import { useTonClient } from "@/hooks/useTonClient";
import { useTonConnect } from "@/hooks/useTonConnect";
import { bigToNumber } from "@/lib/utils";

const GAME_CONTRACT = import.meta.env.VITE_GAME_CONTRACT || "";

export const useMainContract = () => {
  const client = useTonClient();

  const [balance, setBalance] = useState<number>();

  const { sender } = useTonConnect();

  const mainContract = useAsyncInitialize(async () => {
    if (!client) return;

    const contract = new MainContract(Address.parse(GAME_CONTRACT));

    return client.open(contract) as OpenedContract<MainContract>;
  }, [client]);

  useEffect(() => {
    const getValues = async () => {
      if (!client) return;
      try {
        const contractBalance = await client.getBalance(
          Address.parse(GAME_CONTRACT),
        );
        if (contractBalance) {
          setBalance(bigToNumber(contractBalance) / 1000000000);
        }
      } catch (err) {
        console.log(`error in ton balance of contract `, err);
      }
    };
    getValues();
    const intervalId = setInterval(getValues, 10000);

    return () => clearInterval(intervalId);
  }, [client]);

  return {
    sendDeposit: async (value: bigint) => {
      try {
        const response = await mainContract?.sendDeposit(sender, {
          value,
          queryID: 1,
        });
        return response;
      } catch (err) {
        if (err instanceof Error) {
          throw new Error(err.message);
        }
      }
    },
    balance,
  };
};
