import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import util from "util";

export const cls = (classes: (undefined | null | boolean | string)[]) => classes.filter(Boolean).join(" ");

export const shortString = (string: string, length: number, ellipsisPlacement: "center" | "end") => {
  if (!string) return "";
  if (string.length <= length) return string;
  if (ellipsisPlacement === "center") {
    return `${string.slice(0, length / 2)}...${string.slice(-length / 2)}`;
  } else {
    return `${string.slice(0, length - 3)}...`;
  }
}

export const trimSix = (str: string) => str.length > 6 ? str.slice(0, 6) + "..." + str.slice(-6): str;
export const trimFour = (str: string) => str.length > 4 ? str.slice(0, 4) + "..." + str.slice(-4): str;

export function replaceColonWithSpace(text: string) {
  return text.replace(/:/g, ' ');
}

dayjs.extend(relativeTime, {
  thresholds: [
    { l: "s", r: 59, d: "second", },
    { l: "m", r: 299, d: "second", },
    { l: "mm", r: 60, d: "minute", },
  ],
});
dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
  relativeTime: {
    future: (result: string) => {
      if (result === "now") {
        return "now";
      }
      return util.format("in %s", result);
    },
    past: (result: string) => {
      if (result === "now") {
        return "now";
      }
      return util.format("%s ago", result);
    },
    s: (number: number) => {
      if (number < 5) {
        return "now";
      }
      return `${Math.ceil(number / 5) * 5}s`;
    },
    m: (number: number) => {
      const seconds = Math.ceil((number % 60) / 5) * 5
      if (seconds === 0 || seconds === 60) {
        return `${Math.floor(number / 60)}m`
      }
      return `${Math.floor(number / 60)}m ${seconds}s`
    },
    mm: "%dm",
  },
});

export {
  dayjs,
}

export const fromNowFormatter =  (value: any, format?: string) => {
  if (!value) {
    return "N/A";
  }
  const date = dayjs(value);

  if (dayjs().diff(date, "hour") >= 1) {
    return date.format(format ?? "DD MMM 'YY HH:mm");
  }
  return date.fromNow();
}

export const parseBeddows = (beddows: number, decimals: number = 2) => {
  if (beddows) {
    const amountFromBeddows = beddows / 100000000;
    return amountFromBeddows.toFixed(decimals);
  }

  return 0;
}
export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
}