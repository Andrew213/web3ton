import { Address } from "@ton/core";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { useUnit } from "effector-react";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { CoinTon, CoinWeb3, IconMinus, IconPlus } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";
import Spinner from "@/components/ui/spinner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LS_GAME_TIMESTAMP } from "@/constants";
import useLocalStorage from "@/hooks/useLocalStorage";
import usePolling from "@/hooks/usePolling";
import { useTonConnect } from "@/hooks/useTonConnect";
import { cn } from "@/lib/utils";
import { $gamesHistory, fetchHistory } from "@/pages/History/model";
import {
  $forceStop,
  $gameResult,
  startGame,
} from "@/pages/Main/components/Card/model";
import { Coin } from "@/typings/types";
import { jettonToNano } from "@/utils/jettonToNano";

import {
  $amount,
  $coin,
  $isWhitelisted,
  $multiplier,
  changed,
  clickTon,
  clickWeb3,
  clickX2,
  clickX3,
  onBlur,
} from "./model";

const STEP_WEB3 = import.meta.env?.VITE_WEB3_STEP || 10;
const STEP_TON = import.meta.env?.VITE_TON_STEP || 1;

const getMaxStep = (coin: Coin): number =>
  coin === Coin.TON ? +STEP_TON : +STEP_WEB3;

type GameMode = 2 | 3;

type SendResult = Promise<"ok" | undefined>;

interface Props {
  maxBetAmount: number;
  sendDeposit: (_value: bigint) => SendResult;
  sendJetton: (_betAmount: number, _gameMode: GameMode) => SendResult;
}

const BottomControl: React.FC<Props> = ({
  maxBetAmount,
  sendDeposit,
  sendJetton,
}) => {
  const [coin, multiplier, amount, isWhitelisted] = useUnit([
    $coin,
    $multiplier,
    $amount,
    $isWhitelisted,
  ]);

  const [maxStepIncrease, setMaxStepIncrease] = useState(getMaxStep(coin));
  const [maxStepIncreaseError, setMaxStepIncreaseError] = useState("");

  const [maxStepDecrease, setMaxStepDecrease] = useState(getMaxStep(coin));
  const [maxStepDecreaseError, setMaxStepDecreaseError] = useState("");

  const { t } = useTranslation(`DATA_BOTTOM_CONTROL`);

  const amountToNumber = Number(amount);

  const minBetAmount = 1;
  const maxStep = getMaxStep(coin);
  useEffect(() => {
    const recalcOptimalStepIncrease = amountToNumber
      ? Math.min(maxStep, maxBetAmount - amountToNumber)
      : maxStep;
    if (recalcOptimalStepIncrease === 0) {
      setMaxStepIncreaseError(t`error_max`);
    } else {
      setMaxStepIncreaseError("");
      setMaxStepIncrease(recalcOptimalStepIncrease);
    }
    setMaxStepIncrease(recalcOptimalStepIncrease);
  }, [amountToNumber, coin, maxBetAmount, maxStep, t]);

  useEffect(() => {
    if (!amountToNumber) {
      setMaxStepDecreaseError(t`error_min`);
      return;
    }
    const recalcOptimalStepDecrease = Math.min(
      maxStep,
      Math.max(0, amountToNumber - minBetAmount),
    );
    if (recalcOptimalStepDecrease === 0) {
      setMaxStepDecreaseError(t`error_min`);
    } else {
      setMaxStepDecreaseError("");
      setMaxStepDecrease(recalcOptimalStepDecrease);
    }
  }, [amountToNumber, coin, maxBetAmount, maxStep, minBetAmount, t]);

  const userFriendlyAddress = useTonAddress();

  const fetchHistoryCallback = useCallback(() => {
    if (userFriendlyAddress) {
      fetchHistory({
        address: Address.parse(userFriendlyAddress),
        limit: 1,
      });
    }
  }, [userFriendlyAddress]);

  const { setIsEnabledPolling, setIntervalSeconds, isEnabledPolling } =
    usePolling(fetchHistoryCallback);

  const [gameResult, gamesHistory, forceStop] = useUnit([
    $gameResult,
    $gamesHistory,
    $forceStop,
  ]);

  const { connected } = useTonConnect();

  const [tonConnectUI] = useTonConnectUI();

  const [storageTimestamp, setStorageTimestamp, clearValue] =
    useLocalStorage(LS_GAME_TIMESTAMP);

  useEffect(() => {
    if (userFriendlyAddress) {
      fetchHistory({
        address: Address.parse(userFriendlyAddress),
        limit: 1,
      });
    }
  }, [userFriendlyAddress]);

  useEffect(() => {
    if (gamesHistory?.games) {
      const lastGameTime = gamesHistory.games[0].time;
      if (storageTimestamp && lastGameTime) {
        if (lastGameTime < storageTimestamp) {
          startGame(storageTimestamp);
          setIntervalSeconds(5);
          setIsEnabledPolling(true);
        } else {
          clearValue();
        }
      }
    }
  }, [gamesHistory]);

  const handleStartGame = async (value: number) => {
    if (!connected) {
      tonConnectUI.openModal();
      return;
    }
    try {
      const startGameFlow = async (
        response: "ok" | undefined,
      ): Promise<void> => {
        if (response) {
          const currentTime = Date.now() / 1000;
          setStorageTimestamp(currentTime);
          setIsEnabledPolling(true);
          setIntervalSeconds(5);
          startGame(currentTime);
        }
      };

      if (coin === Coin.TON) {
        const response = await sendDeposit(
          BigInt(Number(amountToNumber) * 1000000000),
        );
        await startGameFlow(response);
      } else if (coin === Coin.WEB3) {
        const response = await sendJetton(jettonToNano(value), multiplier);
        await startGameFlow(response);
      }
    } catch (error) {
      console.error("Error during game start:", error);
    }
  };

  useEffect(() => {
    if (gameResult || forceStop) {
      setIsEnabledPolling(false);
      if (storageTimestamp) {
        clearValue();
      }
    }
  }, [
    clearValue,
    gameResult,
    setIsEnabledPolling,
    storageTimestamp,
    forceStop,
  ]);

  return (
    <div className="flex w-full flex-col justify-between gap-4">
      <div className="flex flex-wrap items-center justify-between gap-[10px]">
        <div className="flex max-[389px]:w-full">
          <button
            onClick={() => clickX2()}
            type="button"
            className={cn(
              "w-[102px] rounded-l-3 border border-r-0 bg-background px-3 py-2 font-h1 leading-5 transition-colors hover:bg-accent max-sm:w-[87px] max-[389px]:w-full",
              multiplier === 2 && "bg-primary text-text hover:bg-primary",
            )}
          >
            X2
          </button>
          <button
            onClick={() => {
              clickX3();
              clickWeb3();
            }}
            type="button"
            className={cn(
              "w-[102px] rounded-r-3 border border-l-0 bg-background px-3 py-2 font-h1 leading-5 transition-colors hover:bg-accent max-sm:w-[87px] max-[389px]:w-full",
              multiplier === 3 && "bg-primary text-text hover:bg-primary",
            )}
          >
            X3
          </button>
        </div>

        <div className="flex max-[389px]:w-full">
          <button
            onClick={() => clickTon()}
            type="button"
            className={cn(
              "flex w-[102px] items-center justify-center gap-1 rounded-l-3 border border-r-0 bg-background px-3 py-2 font-500 leading-5 transition-colors hover:bg-background-coin-select hover:text-text max-sm:w-[87px] max-[389px]:w-full",
              coin === Coin.TON && "bg-background-coin-select text-text",
              multiplier === 3 && "pointer-events-none opacity-40",
            )}
          >
            <CoinTon className="size-5 -rotate-[15deg]" />
            {Coin.TON}
          </button>
          <button
            onClick={() => clickWeb3()}
            type="button"
            className={cn(
              "flex w-[102px] items-center justify-center gap-1 rounded-r-3 border border-l-0 bg-background px-3 py-2 font-500 leading-5 transition-colors hover:bg-background-coin-select hover:text-text max-sm:w-[87px] max-[389px]:w-full",
              coin === Coin.WEB3 && "bg-background-coin-select text-text",
            )}
          >
            <CoinWeb3 className="size-5 -rotate-[15deg]" />
            {Coin.WEB3}
          </button>
        </div>
      </div>
      <div className="flex h-11">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                className="flex items-center rounded-l-3 border border-r-0 bg-background px-3 transition-colors hover:bg-accent"
                onClick={() => {
                  const decrease =
                    Math.round((amountToNumber - maxStepDecrease) * 10_000) /
                    10_000;
                  changed(String(decrease <= 0 ? minBetAmount : decrease));
                }}
              >
                <IconMinus />
              </button>
            </TooltipTrigger>
            <TooltipContent className="rounded-2 bg-secondary px-[10px] py-1 text-3 font-p">
              <div>
                {maxStepDecreaseError ||
                  `-${maxStepDecrease} ${coin.toUpperCase()}`}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Input
          className="h-full rounded-none bg-background py-3 text-center font-600"
          type="number"
          onBlur={() => onBlur()}
          value={amount}
          onChange={(e) => {
            const { value } = e.target;
            if (+value > maxBetAmount) {
              changed(String(maxBetAmount));
            } else {
              changed(value);
            }
          }}
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                className="rounded-r-3 border border-l-0 bg-background px-3 transition-colors hover:bg-accent"
                onClick={() => {
                  const increase =
                    Math.round((amountToNumber + maxStepIncrease) * 100) / 100;
                  changed(
                    String(increase > maxBetAmount ? maxBetAmount : increase),
                  );
                }}
              >
                <IconPlus />
              </button>
            </TooltipTrigger>
            <TooltipContent className="rounded-2 bg-secondary px-[10px] py-1 text-3 font-p">
              <div>
                {maxStepIncreaseError ||
                  `+${maxStepIncrease} ${coin.toUpperCase()}`}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <Button
        onClick={() => {
          handleStartGame(amountToNumber);
        }}
        disabled={connected && !isWhitelisted}
        className={cn(
          "rounded-r-0 h-11 w-full rounded-[14px] font-h1 text-text transition-opacity duration-200",
          {
            "pointer-events-none": isEnabledPolling,
          },
          connected && !isWhitelisted && "bg-[#3D2189] text-opacity-40",
        )}
        style={{
          opacity: connected && !isWhitelisted ? 1 : "inherit",
        }}
      >
        {isEnabledPolling ? <Spinner /> : t(`button_play`).toUpperCase()}
      </Button>
    </div>
  );
};

export default BottomControl;
