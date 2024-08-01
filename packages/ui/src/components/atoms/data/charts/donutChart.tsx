import { PieChart } from '@mui/x-charts';

type PieChartDataType = {
  id: number | string;
  value: number;
  label?: string;
  color?: string;
};

interface DonutChartProps {
  data: PieChartDataType[];
  colors?: string[];
  containerWidth?: number;
  containerHeight?: number;
  size?: number;
  sizeAuto?: boolean;
  chartOffset?: number;
}

export const DonutChart = ({
  data,
  colors,
  containerHeight,
  containerWidth,
  size,
  sizeAuto,
  chartOffset,
}: DonutChartProps) => {
  const defaultColors = [
    'var(--color-volt)',
    'var(--color-azule)',
    'var(--color-tulip)',
    'var(--color-lobster)',
    'var(--color-green)',
    'var(--color-yellow)',
  ];

  return (
    <PieChart
      colors={colors ?? defaultColors}
      series={[
        {
          data,
          innerRadius: sizeAuto ? '45%' : size ? size / 4 : 25,
          outerRadius: sizeAuto ? '90%' : size ? size / 2 : 50,
          cx: sizeAuto ? undefined : chartOffset ? chartOffset : size ? size / 2 : 50,
        },
      ]}
      slotProps={{
        legend: {
          labelStyle: {
            fontSize: '14px',
            fontWeight: 'bold',
            fontFamily: 'var(--font-family)',
            fill: 'var(--color-onBackgroundHigh)',
          },
          itemMarkWidth: 8,
          itemMarkHeight: 8,
          itemGap: 16,
          padding: 0,
        },
      }}
      height={containerHeight ?? 150}
      width={containerWidth ?? 225}
    />
  );
};
