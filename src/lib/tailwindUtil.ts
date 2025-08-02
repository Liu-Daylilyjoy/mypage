import { clsx, type ClassValue } from "clsx";

import "highlight.js/styles/atom-one-dark.css";




import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}