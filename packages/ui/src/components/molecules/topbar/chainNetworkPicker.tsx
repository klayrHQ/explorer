import {ChainType, NetworkType} from "../../../types/types.ts";
import {FlexGrid, KeyValueComponent} from "../../atoms";
import {ImageContainer} from "../../atoms/images/imageContainer.tsx";
import {StatusIcon} from "storybook/stories/atoms/base/statusIcon.tsx";
import {ReactElement} from "react";

export interface ChainNetworkPickerProps {
  currentChain: ChainType
  setCurrentChain: (chain: ChainType) => void
  currentNetwork: NetworkType
  setCurrentNetwork: (network: NetworkType) => void
  chains?: ChainType[]
  networks?: NetworkType[]
  imgComponent?: ReactElement
  className?: string
}

export const ChainNetworkPicker = ({ currentChain, currentNetwork, chains, networks, imgComponent, className, }: ChainNetworkPickerProps) => {
  return (
    <FlexGrid>
      <KeyValueComponent
        contentValue={currentChain.chainName}
        hover
        keyValue={
        <ImageContainer
          alt={currentChain.chainName}
          component={imgComponent}
          size={"chainLogo"}
          src={currentChain.chainLogo}
        />
      }
      />
      <KeyValueComponent
        contentValue={currentNetwork.networkName}
        hover
        keyValue={<StatusIcon connected={currentNetwork.connected} />}
      />
      <mOdel></mOdel>
    </FlexGrid>
  )
}