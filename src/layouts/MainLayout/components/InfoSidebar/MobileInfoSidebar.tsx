import { useTranslation } from "react-i18next";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import HistoryCard from "../History/HistoryCard";
import { LeaderboardCard } from "../Leaderboard/LeaderboardCard";

const MobileInfoSidebar: React.FC = () => {
  const { t } = useTranslation("DATA_INFO_SIDEBAR");
  return (
    <div className="flex w-full flex-grow flex-col items-center gap-4 sm:hidden">
      <Tabs defaultValue="leaderboard" className="z-20 w-full">
        <div className="px-4">
          <TabsList>
            <TabsTrigger value="leaderboard">{t`leaderboard`}</TabsTrigger>
            <TabsTrigger value="history">{t`history`}</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="leaderboard">
          <LeaderboardCard />
        </TabsContent>
        <TabsContent value="history">
          <HistoryCard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MobileInfoSidebar;
