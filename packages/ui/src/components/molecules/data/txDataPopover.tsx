import {FlexGrid, Popover, StatusTag, Typography} from "../../atoms";
import {ReactElement} from "react";

interface TxDataPopoverProps {
  txData: {
    status: "success" | "pending" | "failed" | string;
    data: string;
    nonce: number | string;
  };
}

export const TxDataPopover = ({ txData, }: TxDataPopoverProps) => {
  const gap = "3xl";

  return (
    <FlexGrid className={"px-2xl py-lg"} direction={"column"} gap={"xl"}>
      <FlexGrid alignItems={"center"} className={"w-full"} gap={gap} justify={"between"}>
        <Typography color={"onBackgroundLow"} variant={"caption"}>{"Status"}</Typography>
        <StatusTag status={txData.status} variant={"caption"} />
      </FlexGrid>
      <FlexGrid alignItems={"center"} className={"w-full"} gap={gap} justify={"between"}>
        <Typography color={"onBackgroundLow"} variant={"caption"}>{"Data"}</Typography>
        <Typography variant={"caption"}>{txData.data}</Typography>
      </FlexGrid>
      <FlexGrid alignItems={"center"} className={"w-full"} gap={gap} justify={"between"}>
        <Typography color={"onBackgroundLow"} variant={"caption"}>{"Nonce"}</Typography>
        <Typography variant={"caption"}>{txData.nonce}</Typography>
      </FlexGrid>
    </FlexGrid>
  )
}