import { useTonAddress } from "@tonconnect/ui-react";

import GameInfoCard from "../GameInfo/GameInfoCard";
import HistoryCard from "../History/HistoryCard";
import { LeaderboardCard } from "../Leaderboard/LeaderboardCard";
import UserBalanceCard from "../UserBalance/UserBalanceCard";

const InfoSidebar: React.FC = () => {
  const userFriendlyAddress = useTonAddress();

  return (
    <div className="flex h-fit w-full max-w-[348px] flex-col gap-4 px-3 py-4 max-sm:hidden lg:max-w-[460px] lg:p-6">
      {userFriendlyAddress && <UserBalanceCard />}
      <GameInfoCard />
      <LeaderboardCard />
      <HistoryCard />
    </div>
  );
};

export default InfoSidebar;
