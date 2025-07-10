import { useEffect, useState } from "react";

const usePolling = (callback: () => void) => {
  const [isEnabledPolling, setIsEnabledPolling] = useState<boolean>(false);
  const [intervalSeconds, setIntervalSeconds] = useState<number>(1);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isEnabledPolling) {
      callback();
      intervalId = setInterval(() => {
        callback();
      }, intervalSeconds * 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isEnabledPolling, intervalSeconds, callback]);

  return { setIsEnabledPolling, isEnabledPolling, setIntervalSeconds };
};

export default usePolling;
