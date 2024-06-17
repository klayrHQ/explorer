import {ChainType, NetworkType} from "../../../types/types.ts";
import {KeyValueComponent} from "../../atoms";
import {ImageContainer} from "../../atoms/images/imageContainer.tsx";
import {StatusIcon} from "storybook/stories/atoms/base/statusIcon.tsx";

interface ChainNetworkPickerProps {
  currentChain: ChainType
  currentNetwork: NetworkType
  chains: ChainType[]
  networks: NetworkType[]
}

export const ChainNetworkPicker = ({ currentChain, currentNetwork, chains, networks }: ChainNetworkPickerProps) => {
  return (
    <>
      <KeyValueComponent
          keyValue={<ImageContainer src={currentChain.chainLogo} alt={currentChain.chainName} size={"chainLogo"} />}
          contentValue={currentChain.chainName}
      />
      <KeyValueComponent
          keyValue={<StatusIcon connected={currentNetwork.connected} />}
          contentValue={currentNetwork.networkName}
      />
    </>
  )
}