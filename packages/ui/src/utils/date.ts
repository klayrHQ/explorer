export function fromNow(input: Date | number): string {
  const date: Date = input instanceof Date ? input : new Date(input);
  const now: Date = new Date();
  const diffMs: number = date.getTime() - now.getTime();
  const diffSec: number = Math.round(Math.abs(diffMs) / 1000);

  let unit: string = 's';
  let value: number = diffSec;

  if (diffSec >= 60) {
    const diffMin = Math.round(diffSec / 60);
    value = diffMin;
    unit = 'm';

    if (diffMin >= 60) {
      const diffHour = Math.round(diffMin / 60);
      value = diffHour;
      unit = 'h';

      if (diffHour >= 24) {
        const diffDay = Math.round(diffHour / 24);
        value = diffDay;
        unit = 'd';
      }
    }
  }

  return diffMs < 0 ? `${value}${unit} ago` : `in ${value}${unit}`;
}
