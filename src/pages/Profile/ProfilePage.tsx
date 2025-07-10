import { Address } from "@ton/core";
import { useTonAddress } from "@tonconnect/ui-react";
import { useUnit } from "effector-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, useParams } from "react-router-dom";

import {
  $fetchUserError,
  fetchUserStats,
} from "@/components/app/Header/components/WalletMenu/model";
import Notification from "@/components/app/Notification/Notification";
import PageWrapper from "@/components/app/PageWrapper/PageWrapper";

import BalanceTonCard from "./components/BalanceTonCard";
import BalanceWeb3Card from "./components/BalanceWeb3Card";
import ExperienceCard from "./components/ExperienceCard";
import ReferralsCard from "./components/ReferralsCard";
import TotalBetCard from "./components/TotalBetCard";
import TotalWinCard from "./components/TotalWinCard";
import WalletAddressCard from "./components/WalletAddressCard";

const ProfilePage = () => {
  const [isUserIdError, setUserIdError] = useState<boolean>(false);
  const { userId } = useParams<{ userId: string }>();

  const [fetchUserError, loadUserStats] = useUnit([
    $fetchUserError,
    fetchUserStats,
  ]);

  const userFriendlyAddress = useTonAddress();

  const { t } = useTranslation("DATA_PROFILE_PAGE");

  useEffect(() => {
    if (
      (userFriendlyAddress && userId !== userFriendlyAddress) ||
      !userFriendlyAddress
    )
      setUserIdError(true);
  }, [userFriendlyAddress, userId]);

  useEffect(() => {
    if (userFriendlyAddress) {
      loadUserStats(Address.parse(userFriendlyAddress));
    }
  }, [loadUserStats, userFriendlyAddress]);

  if (!userId || isUserIdError) return <Navigate to="/" />;

  if (fetchUserError) {
    return <Notification status="error" title={t`titleError`} />;
  }

  return (
    <PageWrapper title={t`title`}>
      <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 max-md:gap-y-4 sm:grid-cols-2">
        <WalletAddressCard walletAddress={userId} />
        <ExperienceCard />
        <ReferralsCard />
        <BalanceTonCard />
        <BalanceWeb3Card />
        <TotalBetCard />
        <TotalWinCard />
      </div>
    </PageWrapper>
  );
};

export default ProfilePage;
