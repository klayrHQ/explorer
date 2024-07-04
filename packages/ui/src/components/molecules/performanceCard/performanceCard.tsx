import { Typography } from "../../atoms/base/typography";
import { Icon } from "../../atoms/images/icon";
import { ColorType, IconComponent } from "../../../types/types";

export interface PerformanceCardProps {
  title: string;
  value: string;
  percentage: string;
  trend: boolean;
  statsVS: string;
  className?: string;
}

export const PerformanceCard = ({
  title,
  value,
  percentage,
  statsVS,
  trend,
  className,
}: PerformanceCardProps) => {
  return (
    <div className={`flex flex-col items-start gap-4 border rounded-xl border-gray-7 p-6 w-performanceCardWidthMobile desktop:w-performanceCardWidth ${className}`}>
      <Typography
        className=""
        color="gray-1"
        component="p"
        fontWeight="semibold"
        variant="paragraph-sm"
      >
        {title}
      </Typography>
      <div className="flex flex-col gap-2">
        <Typography
          className=""
          color="gray-1"
          component="h3"
          fontWeight="bold"
          variant="h5"
        >
          {value}
        </Typography>
        <div className="flex items-center">
          <Icon
            color={trend ? "lobster" : ("lobster" as ColorType)}
            icon={trend ? "TrendUp" : "TrendDown"}
            size="inherit"
          />
          <Typography
            className="mr-1 ml-0.5" 
            color={trend ? "green" : ("lobster" as ColorType)}
            component="p"
            fontWeight="semibold"
            variant="caption"
          >
            {percentage}
          </Typography>
          <Typography
            className=""
            color="gray-5"
            component="p"
            fontWeight="semibold"
            variant="caption"
          >
            {statsVS}
          </Typography>
        </div>
      </div>
    </div>
  );
};
