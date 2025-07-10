import { Address } from "@ton/core";
import { useTonAddress } from "@tonconnect/ui-react";
import { useCallback, useEffect, useState } from "react";

import { useTonClient } from "@/hooks/useTonClient";
import { bigToNumber, nanoToTon } from "@/lib/utils";

const useTonBalance = () => {
  const [loading, setLoading] = useState(true);
  const [tonBalance, setTonBalance] = useState(0);
  const [retryCount, setRetryCount] = useState(0);

  const userFriendlyAddress = useTonAddress();
  const client = useTonClient();

  const getTonBalance = useCallback(async () => {
    if (!client || !userFriendlyAddress) {
      return;
    }

    try {
      setLoading(true);

      const balance = await client.getBalance(
        Address.parse(userFriendlyAddress),
      );
      const balanceToNumber = bigToNumber(balance);
      const balanceFromNano = nanoToTon(balanceToNumber);
      const balanceRounded = Math.floor(balanceFromNano * 10) / 10;
      setTonBalance(balanceRounded);
    } catch (error) {
      if (retryCount < 5) {
        console.error(
          `Error fetching ton balance (attempt ${retryCount + 1}`,
          error,
        );
        setTimeout(() => {
          setRetryCount((prevCount) => prevCount + 1);
        }, 2000); // если ошибка, делаю повторный ззапрос
      } else {
        console.error(`Final Error fetching ton balance`, error);
      }
    } finally {
      setLoading(false);
    }
  }, [client, userFriendlyAddress, retryCount]);

  useEffect(() => {
    if (client && userFriendlyAddress) {
      getTonBalance();
    }
  }, [client, getTonBalance, userFriendlyAddress]);

  return { loading, tonBalance, getTonBalance };
};

export default useTonBalance;
