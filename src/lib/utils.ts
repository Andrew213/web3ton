import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { ImgLoseWeb3, ImgWinTon, ImgWinWeb3 } from "@/assets/img";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRankGradient(position: number): string | null {
  if (position >= 1 && position <= 3) {
    return `bg-${position}-rank-gradient`;
  }
  return null;
}

export function nanoToTon(num: number) {
  return num / 1000000000;
}

export const bigToNumber = (value: bigint | string): number => {
  try {
    const bigIntValue = typeof value === "string" ? BigInt(value) : value;

    if (
      bigIntValue > BigInt(Number.MAX_SAFE_INTEGER) ||
      bigIntValue < BigInt(Number.MIN_SAFE_INTEGER)
    ) {
      return NaN;
    }

    return Number(bigIntValue);
  } catch (error) {
    return NaN; // Возвращаем NaN в случае ошибки преобразования BigInt
  }
};

export function formatDateFromTimestamp(timestamp: number) {
  const date = new Date(timestamp * 1000);
  const formatter = new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
  const formattedDateParts = formatter.formatToParts(date);

  type DateParts = {
    // eslint-disable-next-line no-unused-vars
    [key in "day" | "month" | "year" | "hour" | "minute"]?: string;
  };

  const dateParts: DateParts = formattedDateParts.reduce((acc, part) => {
    if (
      part.type === "day" ||
      part.type === "month" ||
      part.type === "year" ||
      part.type === "hour" ||
      part.type === "minute"
    ) {
      acc[part.type] = part.value;
    }
    return acc;
  }, {} as DateParts);

  const { day, month, year, hour: hours, minute: minutes } = dateParts;

  return { day, month, year, hours, minutes };
}

export function getResultImage(isTon: boolean, isWin: boolean): string {
  switch (true) {
    case isTon && isWin:
      return ImgWinTon;
    case isTon && !isWin:
      return ImgWinWeb3;
    case !isTon && isWin:
      return ImgWinWeb3;
    case !isTon && !isWin:
      return ImgLoseWeb3;
    default:
      return ImgWinWeb3;
  }
}

export const formatProfit = (amount: number, multiplier: number): string => {
  const product = amount * multiplier;
  if (product - Math.floor(product) < 0.1) {
    return product.toFixed(0);
  }
  return product.toFixed(2);
};
