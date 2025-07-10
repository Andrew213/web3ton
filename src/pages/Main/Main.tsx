import { useUnit } from "effector-react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useJettonContract } from "@/hooks/useJetton";
import { useMainContract } from "@/hooks/useMainContract";
import { useMaxBet } from "@/hooks/useMaxBet";
import UserBalanceMobile from "@/layouts/MainLayout/components/UserBalance/UserBalanceMobile";
import { setSpotLightBrighter } from "@/lib/model";
import BottomControl from "@/pages/Main/components/BottomControl/BottomControl";
import { $coin } from "@/pages/Main/components/BottomControl/model";
import Card from "@/pages/Main/components/CardWrapper/CardWrapper";
import RulesModal from "@/pages/Main/components/RulesModal/RulesModal";
import { getMaxBetAmount } from "@/utils/getMaxBetAmount";

const Main: React.FC = () => {
  const [coin] = useUnit([$coin]);
  const { isBelowSm } = useBreakpoint("sm");

  const ref = useRef<HTMLDivElement>(null);

  const onMouseEnter = () => {
    setSpotLightBrighter(true);
  };

  const onMouseLeave = () => {
    setSpotLightBrighter(false);
  };

  const { t } = useTranslation(`DATA_MAIN_PAGE`);

  const { sendDeposit } = useMainContract();
  const { sendJetton } = useJettonContract();

  const { maxTonBet, maxJettonBet } = useMaxBet();

  const maxBetAmount = getMaxBetAmount(coin, maxTonBet, maxJettonBet);

  return (
    <div className="flex h-full flex-shrink-0 flex-grow flex-col justify-center">
      <div className="flex items-center justify-between">
        <h3 className="z-20 text-h3 font-h3 max-lg:text-h4 max-lg:font-h4">
          {t(`title`)}
        </h3>
        <div className="z-20">
          <RulesModal />
        </div>
      </div>
      <div className="mt-4 flex h-full flex-grow flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-10 max-md:w-full">
          <div
            className="flex h-full w-full flex-col items-center justify-center gap-10 max-lg:gap-6 max-md:gap-26 max-sm:gap-4"
            ref={ref}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <Card />
            <div className="z-20">
              <BottomControl
                sendDeposit={sendDeposit}
                sendJetton={sendJetton}
                maxBetAmount={maxBetAmount}
              />
            </div>
          </div>

          <div className="z-20 -mt-6 flex w-full flex-col gap-2 text-3 font-p text-muted-foreground max-md:flex-col">
            {isBelowSm && <UserBalanceMobile />}
            <div className="flex justify-between max-lg:gap-1">
              {t(`betMinText`)}
              <span className="text-inverse">{`1 ${coin}`}</span>
            </div>
            <div className="flex justify-between text-3 font-p text-muted-foreground max-lg:gap-1">
              {t(`betMaxText`)}

              <span className="text-inverse">{`${maxBetAmount} ${coin}`}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
