import {cls} from "@repo/ui/utils";

interface StatusIconProps {
  connected?: boolean,
}

export const StatusIcon = ({ connected, }: StatusIconProps) => {
  return (
      <div
          className={cls([
              "rounded-full w-2 h-2",
              connected ? "bg-green" : "bg-red",
          ])}
      />
  )
}