"use client"
import {Topbar} from "@repo/ui/organisms";
import {MenuItemProps} from "@repo/ui/atoms";
import {kpisObject} from "../../utils/constants.tsx";
import { useChainNetwork } from "../../providers/chainNetworkProvider.tsx";

interface TopbarClientProps {
  logo: {
    logoSrc: string
    altText: string
    logoText: string
  }
  mobileMenuItems: Omit<MenuItemProps, "subMenu">[]
}

export const TopbarClient = ({ logo, mobileMenuItems, }: TopbarClientProps ) => {
  const {
    currentChain,
    setCurrentChain,
    currentNetwork,
    setCurrentNetwork,
    chains,
    networks,
  } = useChainNetwork()

  return (
    <Topbar
      chainNetworkData={{currentChain, setCurrentChain, currentNetwork, setCurrentNetwork, chains, networks,}} 
      kpis={kpisObject}
      logo={logo}
      mobileMenuItems={mobileMenuItems}
    />
  )
}