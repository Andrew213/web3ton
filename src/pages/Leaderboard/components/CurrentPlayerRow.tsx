import { useUnit } from "effector-react";

import { Player } from "@/api/types";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { getRankMedal } from "@/layouts/MainLayout/components/GamesMenuSidebar/utils";
import { nanoToTon } from "@/lib/utils";
import { $coin } from "@/pages/Main/components/BottomControl/model";
import { cropAddress } from "@/utils/cropAddress";

import { $isGlobalRatingLoading } from "../model";

interface IProps {
  player: Player | null | undefined;
}
const CurrentPlayerRow: React.FC<IProps> = ({ player }) => {
  const [currency] = useUnit([$coin]);
  const [loading] = useUnit([$isGlobalRatingLoading]);

  const showLoading = () => {
    return (
      <TableRow>
        <TableCell>
          <Skeleton className="h-4" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4" />
        </TableCell>
      </TableRow>
    );
  };

  if (!player) {
    return (
      <Card className="mt-6 flex w-full max-w-308 flex-col items-center justify-between gap-4 px-3 py-4 sm:flex-row md:px-6">
        Error
      </Card>
    );
  }

  return (
    <Card className="mt-6 flex h-[56px] w-full max-w-308 items-center px-3 md:px-6">
      <Table>
        <TableBody>
          {loading ? (
            showLoading()
          ) : (
            <TableRow>
              <TableCell className="w-10 max-sm:pl-0 sm:w-[100px]">
                {getRankMedal(player.position)}
              </TableCell>
              <TableCell className="sm:w-[50%]">
                <div className="flex w-full items-center text-3 font-500">
                  {cropAddress(player.address)}
                  <div className="ml-1.5 h-[15px] rounded-3.5 bg-green-500 px-1 text-[8px] leading-[15px] text-white">
                    YOU
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-3 font-600">
                <span>{nanoToTon(player.total_bets)}</span>
                <span className="ml-1 text-muted-accent-foreground">
                  {currency}
                </span>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
};

export default CurrentPlayerRow;
