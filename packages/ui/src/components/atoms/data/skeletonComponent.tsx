import {cls} from "../../../utils/functions.ts";

interface SkeletonComponentProps {
  height?: string;
  width?: string;
  className?: string;
}

export const SkeletonComponent = ({ height, width, className, }: SkeletonComponentProps) => {
  return (
    <div
      className={cls([
        "animate-pulse rounded-full bg-backgroundTertiary",
        height ? `h-${height}` : "h-full",
        width ? `w-${width}` : "w-full",
        className,
      ])}
    />
  )
}