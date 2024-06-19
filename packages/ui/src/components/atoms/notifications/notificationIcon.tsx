import {Typography} from "../base/typography.tsx";
import {cls} from "../../../utils/functions.ts";

interface NotificationIconProps {
  className?: string
}

export const NotificationIcon = ({ className, }: NotificationIconProps) => {
  return (
    <div
      className={cls([
        "flex items-center justify-center w-3.5 h-3.5 bg-primary rounded-full",
        className,
      ])}
    >
      <Typography color={"onPrimary"} fontWeight={"semibold"} variant={"footer"}>{"!"}</Typography>
    </div>
  );
}