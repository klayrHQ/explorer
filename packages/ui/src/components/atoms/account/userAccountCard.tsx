import {FlexGrid, ImageContainer, Typography} from "@repo/ui/atoms";
import {shortString} from "@repo/ui/utils";
import {Avatar} from "./avatar/avatar.tsx";

interface UserAccountCardProps {
  address: string
  name?: string
}

export const UserAccountCard = ({ address, name, }: UserAccountCardProps) => {
  return (
    <FlexGrid alignItems={"center"} className={"w-full cursor-pointer"} gap={"md"}>
      <Avatar address={address} circle size={32} />
      <FlexGrid direction={"column"} gap={"0"}>
        <Typography className={"leading-none"} color={"onBackgroundMediumHigh"} variant={"paragraph-sm"}>{name}</Typography>
        <Typography className={"leading-none"} color={"onBackgroundLow"} variant={"caption"}>{shortString(address, 12, "center")}</Typography>
      </FlexGrid>
    </FlexGrid>
  )
}