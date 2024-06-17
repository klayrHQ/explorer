import { Typography } from "../../atoms/base/typography";
import { Icon } from "../../atoms/images/icon";
import { ColorType, IconComponent } from "../../../types/types";

export interface PerformanceCardProps {
  title: string;
  value: string;
  percentage: string;
  trend: boolean;
  statsVS: string;
  icon?: IconComponent;
  color: ColorType;
}

export const PerformanceCard = ({
  title,
  value,
  percentage,
  statsVS,
  trend,
  color,
  icon,
}: PerformanceCardProps) => {
  return (
    <div className="flex flex-col gap-4 border rounded-xl border-gray-7 p-6 min-w-52">
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
        <div className="flex ">
          <Icon
            color={trend ? "lobster" : ("lobster" as ColorType)}
            icon={trend ? "TrendUp" : "TrendDown"}
            size="small"
          />
          <Typography
            className="ml-0.5 mr-1"
            color={trend ? "green" : ("lobster" as ColorType)}
            component="p"
            fontWeight="normal"
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
