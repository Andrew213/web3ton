import { useTonAddress } from "@tonconnect/ui-react";
import { useUnit } from "effector-react";
import { useMatch } from "react-router-dom";

import { Progress } from "@/components/ui/progress";
import { TARGET_EXPERIENCE } from "@/constants";
import { $userExperience } from "@/pages/Profile/components/model";

import { LevelBadge } from "../../LevelBage/LevelBadge";

const ExperienceBar = () => {
  const [userExperience] = useUnit([$userExperience]);

  const userFriendlyAddress = useTonAddress();

  const match = useMatch("/profile/:id");

  const userLevel = userExperience?.level || 0;
  const currExp = Number(userExperience?.current.toFixed(2));
  const targetExP = userExperience?.target || TARGET_EXPERIENCE;
  const progressValue = (currExp / targetExP) * 100;

  if (!userFriendlyAddress || match) {
    return null;
  }

  return (
    <div className="flex items-center max-sm:hidden lg:ml-[50px]">
      <LevelBadge size="sm" level={userLevel} />
      <Progress
        className="my-1.5 -ml-1 w-40 duration-700"
        value={progressValue}
      />
    </div>
  );
};

export default ExperienceBar;
