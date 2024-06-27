import {
  PerformanceCard,
  PerformanceCardProps,
} from "../../molecules/performanceCard/performanceCard";
import { Grid } from "../../atoms/base/grid";

interface PerformanceCardGridProps {
  stats: PerformanceCardProps[];
}

export const PerformanceCardGrid = ({ stats, }: PerformanceCardGridProps) => {
  return (
    <Grid className={"w-full"} columns="2" desktopCols="5" desktopGap="6" gap="4">
      {stats.map((stat, index) => (
        <PerformanceCard
        // eslint-disable-next-line react/no-array-index-key
          key={index}
          {...stat}
          className={index === stats.length - 1 ? "col-span-2 desktop:col-span-1" : ""}
        />
      ))}
    </Grid>
  );
};
