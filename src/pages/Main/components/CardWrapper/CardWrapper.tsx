import { Address } from "@ton/core";
import { useTonAddress } from "@tonconnect/ui-react";
import { useUnit } from "effector-react";
import { useEffect, useRef, useState } from "react";

import { CARD_FLIP_BACK_TIMEOUT } from "@/constants";
import { fetchAllHistory } from "@/layouts/MainLayout/components/History/model";
import { setSpotLightBrighter } from "@/lib/model";
import { cn } from "@/lib/utils";
import Card from "@/pages/Main/components/Card/Card";
import {
  $gameResult,
  endGame,
  GameStatus,
  setCardPosition,
} from "@/pages/Main/components/Card/model";
import { fetchUserExperience } from "@/pages/Profile/components/model";

function getElementPositionPercentageRelativeToParent(element: HTMLElement): {
  x: number;
  y: number;
} {
  const card = element.getBoundingClientRect();
  const parentRect = document
    .getElementById("spotlight")
    ?.getBoundingClientRect();

  if (!parentRect) {
    return { x: 0, y: 0 };
  }

  const xPercentage =
    ((card.left - parentRect.left + card.width / 2) / parentRect.width) * 100;
  const yPercentage =
    ((card.top - parentRect.top + card.height / 2) / parentRect.height) * 100;

  return { x: xPercentage, y: yPercentage };
}

interface Props {
  flip?: boolean;
  onReset?: () => void;
  status?: GameStatus;
  amount?: number;
  isBackFace?: boolean;
  className?: string;
}

const CardWrapper: React.FC<Props> = (props) => {
  const [gameResult, loadUserXP] = useUnit([$gameResult, fetchUserExperience]);

  const cardRef = useRef<HTMLDivElement>(null);

  const userFriendlyAddress = useTonAddress();

  useEffect(() => {
    if (cardRef.current) {
      const position = getElementPositionPercentageRelativeToParent(
        cardRef.current,
      );
      setCardPosition(position);
    }
  }, []);

  const [cardClass, setCardClass] = useState("");

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let flipBackId: NodeJS.Timeout;
    if (gameResult) {
      timeoutId = setTimeout(() => {
        setCardClass("overflow-hidden");
      }, 300);
      flipBackId = setTimeout(() => {
        setCardClass("");
        endGame();
      }, CARD_FLIP_BACK_TIMEOUT * 1000);

      fetchAllHistory({
        limit: 11,
        page: 1,
      });

      loadUserXP(Address.parse(userFriendlyAddress));
    }

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(flipBackId);
    };
  }, [gameResult]);

  return (
    <div
      ref={cardRef}
      className="group relative z-10 [perspective:1000px] max-lg:h-[450px] max-lg:w-[316px] max-md:h-[600px] max-md:w-[420px] max-sm:h-[450px] max-sm:w-[316px] lg:h-[600px] lg:w-[420px]"
      onMouseEnter={() => setSpotLightBrighter(true)}
      onMouseLeave={() => setSpotLightBrighter(false)}
    >
      <div
        className={cn(
          "h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d]",
          gameResult && "[transform:rotateY(180deg)]",
        )}
      >
        <Card {...props} className={cardClass} amount={12} />
        <Card
          status={gameResult?.status}
          amount={gameResult?.amount}
          className="[backface-visibility:hidden] [transform:rotateY(180deg)]"
        />
      </div>
    </div>
  );
};

export default CardWrapper;
