export const cls = (classes: (undefined | null | boolean | string)[]) => classes.filter(Boolean).join(" ");

export const trimSix = (str: string) => str.length > 6 ? str.slice(0, 6) + "..." + str.slice(-6): str;
export const trimFour = (str: string) => str.length > 4 ? str.slice(0, 4) + "..." + str.slice(-4): str;