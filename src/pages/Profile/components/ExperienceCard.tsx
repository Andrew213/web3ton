import { useUnit } from "effector-react";
import { useTranslation } from "react-i18next";

import { LevelBadge } from "@/components/app/LevelBage/LevelBadge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { TARGET_EXPERIENCE } from "@/constants";

import GetExpModal from "./GetExperienceModal";
import { $isUserExperienceLoading, $userExperience } from "./model";

const ExperienceCard = () => {
  const [userExperience, isLoading] = useUnit([
    $userExperience,
    $isUserExperienceLoading,
  ]);
  const userLevel = userExperience?.level || 0;
  const currExp = Number(userExperience?.current.toFixed(2));
  const targetExP = userExperience?.target || TARGET_EXPERIENCE;
  const progressValue = (currExp / targetExP) * 100;

  const { t } = useTranslation("DATA_PROFILE_PAGE");

  return (
    <Card className="max-w-4xl space-y-4 p-5">
      <h3 className="font-500">{t`level`}</h3>
      {isLoading ? (
        <Skeleton className="h-10" />
      ) : (
        <div className="flex gap-4">
          <LevelBadge level={userLevel} />
          <div className="w-full">
            <Progress className="my-1.5" value={progressValue} />
            <div className="flex w-full justify-between font-500">
              <span>{`${t`level`} ${userLevel}`}</span>
              <div>
                {currExp}
                <span className="text-gray-600">/{targetExP}</span>
              </div>
            </div>
          </div>
        </div>
      )}
      <GetExpModal />
    </Card>
  );
};

export default ExperienceCard;
