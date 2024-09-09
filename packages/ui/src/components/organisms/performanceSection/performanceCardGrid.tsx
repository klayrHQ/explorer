import { PerformanceCard, PerformanceCardProps } from '../../molecules';
import { Grid } from '../../atoms';

interface PerformanceCardGridProps {
  stats: PerformanceCardProps[];
}

export const PerformanceCardGrid = ({ stats }: PerformanceCardGridProps) => {
  return (
    <Grid
      className={'w-full desktopLxl:grid-cols-4'}
      columns="1"
      desktopCols="2"
      desktopGap="6"
      gap="4"
      tabletCols={'2'}
    >
      {stats.map((stat, index) => (
        <PerformanceCard
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          {...stat}
          //className={index === stats.length - 1 ? 'tablet:col-span-2 desktop:col-span-1' : ''}
        />
      ))}
    </Grid>
  );
};
