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