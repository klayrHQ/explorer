import { PerformanceCardGrid } from "./performanceCardGrid";
import { PerformanceCardProps } from "../../molecules/performanceCard/performanceCard";
import { Typography } from "../../atoms";
import { FlexGrid } from "../../atoms/base/flexGrid";
import { CustomSelect, CustomSelectProps } from "../../atoms/input/select";
import { Icon } from "../../atoms/images/icon";

interface PerformanceSectionProps {
  stats: PerformanceCardProps[];
  options: CustomSelectProps["options"];
}

export const PerformanceSection = ({
  stats,
  options,
}: PerformanceSectionProps) => {
  return (
    <FlexGrid component="article" direction="column" gap="8">
      <div className=" hidden desktop:flex items-center justify-between ">
        <FlexGrid  direction="row" gap="2">
          <Typography
            className="hover:text-gray-4"
            color="gray-1"
            component="h4"
            fontWeight="bold"
            variant="h4"
          >
           
            <a href="/performance">
              Klayr performance
            </a>
          </Typography>
          <Icon className="w-8 h-8" icon="ArrowUpRight" />
          {/*Icon size not working  */}
        </FlexGrid>
        <FlexGrid alignItems="center" gap="3">
          <Typography
            color="gray-5"
            component="p"
            fontWeight="semibold"
            variant="paragraph-sm"
          // eslint-disable-next-line react/jsx-no-literals
          >
            Show stats vs
          </Typography>
          <CustomSelect defaultValue="lastMonth" options={options} width="md" />
        </FlexGrid>
      </div>

      <PerformanceCardGrid stats={stats} />
    </FlexGrid>
  );
};
