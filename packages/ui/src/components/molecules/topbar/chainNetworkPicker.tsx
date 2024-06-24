import {ChainType, NetworkType} from "../../../types/types.ts";
import {FlexGrid, KeyValueComponent} from "../../atoms";
import {ImageContainer} from "../../atoms/images/imageContainer.tsx";
import {StatusIcon} from "storybook/stories/atoms/base/statusIcon.tsx";
import {ReactElement} from "react";

export interface ChainNetworkPickerProps {
  currentChain: ChainType
  currentNetwork: NetworkType
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
          className={"mt-px"}
          component={imgComponent}
          src={currentChain.chainLogo}
          variant={"chainLogo"}
        />
      }
      />
      <KeyValueComponent
        contentValue={currentNetwork.networkName}
        hover
        keyValue={<StatusIcon className={"mt-px"} connected={currentNetwork.connected} />}
      />
    </FlexGrid>
  )
}