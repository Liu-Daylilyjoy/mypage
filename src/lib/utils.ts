import { clsx, type ClassValue } from "clsx";
import MarkdownIt from "markdown-it";
import MarkdownItKatex from "markdown-it-katex";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

import bash from "highlight.js/lib/languages/bash";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";


import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

hljs.registerLanguage("bash", bash);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang): string {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre><code>' +
          hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
          "</code></pre>"
        );
      } catch (_) { }
    }

    return (
      '<pre><code>' +
      md.utils.escapeHtml(str) +
      "</code></pre>"
    )
  },
}).use(MarkdownItKatex);

export { md }