import {Typography} from "../base/typography.tsx";
import {cls} from "../../../utils/functions.ts";
import { cva } from "class-variance-authority";

interface NotificationIconProps {
  className?: string
  notificationValue: number | string
  size?: "sm" | "lg"
}

const notificationIconVariants = cva(
  ["flex items-center justify-center bg-primary rounded-full"],
  { variants: {
    size: {
      sm: 'w-3.5 h-3.5',
      lg: 'w-5 h-5',
    },
  },
  defaultVariants: {
    size: 'sm',
  },},
)

export const NotificationIcon = ({ className, notificationValue, size='sm', }: NotificationIconProps) => {
  return (
    <div
    className={cls([
      notificationIconVariants({ size }),
      className,
    ])}
    >
      <Typography color={"onPrimary"} fontWeight={"semibold"} variant={"footer"}>{notificationValue}</Typography>
    </div>
  );
}