import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNowStrict } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* REVERSE DATE FUNCTION */
export const reverseCountDate = (fromDate: Date) => {
  const currentDate = new Date();
  if (currentDate.getTime() - fromDate.getTime() < 24 * 60 * 60 * 1000) {
    return `posted ${formatDistanceToNowStrict(fromDate, { addSuffix: true })}`;
  } else {
    if (currentDate.getFullYear() === fromDate.getFullYear()) {
      return `posted on ${format(fromDate, "MMMM d")}`;
    } else {
      return `posted on ${format(fromDate, "MMMM d yyyy")}`;
    }
  }
};

/* FORMAT NUMBER */
export const formatNumber = (num: number): string => {
  return Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(num);
};
