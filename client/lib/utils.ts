import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const dateTimeFormat = new Intl.DateTimeFormat(undefined, {
  weekday: "short",
  day: "numeric",
  month: "short",
  hour: "numeric",
  minute: "2-digit",
});

const dateFormat = new Intl.DateTimeFormat(undefined, {
  day: "numeric",
  month: "short",
  year: "numeric",
});

/** "Mon, 16 Nov, 10:40 PM" style timestamp in the viewer's locale. */
export function formatDateTime(value: string | number | Date): string {
  return dateTimeFormat.format(new Date(value));
}

/** "16 Nov 2026" style date in the viewer's locale. */
export function formatDate(value: string | number | Date): string {
  return dateFormat.format(new Date(value));
}
