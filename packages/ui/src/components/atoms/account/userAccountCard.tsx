import {FlexGrid, Typography} from "@repo/ui/atoms";
import {shortString} from "@repo/ui/utils";
import {Avatar} from "./avatar/avatar.tsx";

interface UserAccountCardProps {
  address: string
  name?: string
}

export const UserAccountCard = ({ address, name, }: UserAccountCardProps) => {
  return (
    <FlexGrid alignItems={"center"} className={"w-full cursor-pointer"} gap={"md"} mobileDirection={"row"}>
      <Avatar address={address} circle size={32} />
      <FlexGrid direction={"col"} gap={"0"}>
        <Typography className={"leading-none"} color={"onBackgroundMediumHigh"} variant={"paragraph-sm"}>{name}</Typography>
        <Typography className={"leading-none"} color={"onBackgroundLow"} variant={"caption"}>{shortString(address, 12, "center")}</Typography>
      </FlexGrid>
    </FlexGrid>
  )
}