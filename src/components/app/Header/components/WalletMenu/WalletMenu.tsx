import { Address } from "@ton/core";
import {
  CHAIN,
  useTonAddress,
  useTonConnectUI,
  useTonWallet,
} from "@tonconnect/ui-react";
import { useUnit } from "effector-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useSearchParams } from "react-router-dom";

import { registerUser } from "@/api/requests/PostRegister";
import { IconChevron, IconHistory, IconLogout } from "@/assets/icons";
import { fetchUserStats } from "@/components/app/Header/components/WalletMenu/model";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { fetchWhitelist } from "@/pages/Main/components/BottomControl/model";
import { fetchUserExperience } from "@/pages/Profile/components/model";
import { menuRoutes } from "@/routes/routes";
import { cropAddress } from "@/utils/cropAddress";

const NETWORK = import.meta.env.VITE_NETWORK ?? "TESTNET";

const WalletMenu = () => {
  const [loadUserStats, loadUserXP, checkWhitelist] = useUnit([
    fetchUserStats,
    fetchUserExperience,
    fetchWhitelist,
  ]);

  const [isOpen, setIsOpen] = useState(false);

  const [tonConnectUI] = useTonConnectUI();

  const wallet = useTonWallet();

  const userFriendlyAddress = useTonAddress();

  const [searchParams] = useSearchParams();
  const refAddress = searchParams.get("ref");

  const { t } = useTranslation("DATA_WALLET_MENU");

  useEffect(() => {
    if (wallet?.account.chain) {
      const walletChain = wallet.account.chain;

      if (walletChain !== CHAIN[NETWORK]) {
        tonConnectUI.disconnect();
      }
    }
  }, [wallet]);

  useEffect(() => {
    if (userFriendlyAddress) {
      registerUser(userFriendlyAddress, refAddress);
      loadUserXP(Address.parse(userFriendlyAddress));
      checkWhitelist(Address.parse(userFriendlyAddress));
    }
  }, [loadUserStats, userFriendlyAddress]);

  return userFriendlyAddress ? (
    <div className="max-lg:hidden">
      <DropdownMenu onOpenChange={() => setIsOpen((prev) => !prev)}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative rounded-[14px] border">
            {cropAddress(userFriendlyAddress)}
            <IconChevron
              className={`${isOpen ? "rotate-180" : "rotate-0"} text-foreground transition-transform duration-200`}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          asChild
          className="flex w-full min-w-full max-w-64 flex-col gap-3 rounded-[14px] py-1"
        >
          <ul>
            <li className="transition-color group flex w-full cursor-pointer items-center justify-between rounded-3 px-2 py-1.5 text-th font-th duration-200 hover:bg-secondary">
              <Link to={`/profile/${userFriendlyAddress}`}>
                <button type="button" className="flex flex-col">
                  <span className="text-start text-3 font-500 text-muted-foreground">
                    {t`itemProfile`}
                  </span>
                  {cropAddress(userFriendlyAddress)}
                </button>
              </Link>
              <IconChevron className="-rotate-90 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            </li>
            <li className="transition-color group rounded-3 px-2 py-1.5 duration-200 hover:bg-secondary">
              <Link to={menuRoutes.history} className="flex items-center gap-2">
                <IconHistory />
                {t`itemHistory`}
                <IconChevron className="ml-auto -rotate-90 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              </Link>
            </li>
            <li
              aria-hidden="true"
              onClick={() => {
                tonConnectUI.disconnect();
              }}
              className="transition-color group flex cursor-pointer items-center gap-2 rounded-3 px-2 py-1.5 duration-200 hover:bg-secondary"
            >
              <IconLogout />
              {t`itemLogout`}
              <IconChevron className="ml-auto -rotate-90 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            </li>
          </ul>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ) : (
    <Button
      onClick={() => tonConnectUI.openModal()}
      className="rounded-[14px] font-500 text-text max-sm:hidden"
    >
      {t`connectWallet`}
    </Button>
  );
};

export default WalletMenu;
