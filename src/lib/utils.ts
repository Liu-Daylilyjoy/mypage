import { clsx, type ClassValue } from "clsx"
import MarkdownIt from "markdown-it";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});