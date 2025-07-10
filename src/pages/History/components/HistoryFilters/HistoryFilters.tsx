import { useUnit } from "effector-react";
import { useTranslation } from "react-i18next";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  $filterHistoryByGameValue,
  $filterHistoryByResultValue,
  filterHistoryByGame,
  filterHistoryByResult,
} from "@/pages/History/components/HistoryFilters/model";
import { data } from "@/pages/History/constants";

const HistoryFilters = () => {
  const { t } = useTranslation("DATA_HISTORY_FILTERS");

  const [filterByGameValue, filterByResultValue] = useUnit([
    $filterHistoryByGameValue,
    $filterHistoryByResultValue,
  ]);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div>
        <Select onValueChange={filterHistoryByGame}>
          <SelectTrigger>
            <SelectValue
              placeholder={t(
                `gamesFilter.${data.gamesFilter[Number(filterByGameValue)].label}`,
              )}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {data.gamesFilter.map(({ label }, i) => {
                return (
                  <SelectItem value={String(i)} key={`${label + i}`}>
                    {t(`gamesFilter.${label}`)}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Select onValueChange={filterHistoryByResult}>
          <SelectTrigger className="flex-grow-0">
            <SelectValue
              placeholder={t(
                `resultsFilter.${data.resultsFilter[Number(filterByResultValue)].label}`,
              )}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {data.resultsFilter.map(({ label }, i) => {
                return (
                  <SelectItem value={String(i)} key={`${label + i}`}>
                    {t(`resultsFilter.${label}`)}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default HistoryFilters;
