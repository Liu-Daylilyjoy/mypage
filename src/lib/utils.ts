import { clsx, type ClassValue } from "clsx";
import MarkdownIt from "markdown-it";
import MarkdownItKatex from "markdown-it-katex";
import MarkdownItAnchor from "markdown-it-anchor";
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

// 自定义的 slugify 函数
// 这个函数会移除所有的非字母、数字、空格和连字符的字符
// 然后将空格替换为连字符，并转换为小写
function customSlugify(s: string) {
  // 移除所有 Emoji 和其他非字母数字字符，但保留空格和连字符
  // \p{Emoji_Presentation} 是一个 Unicode 属性，用于匹配 Emoji 字符
  const cleaned = s.replace(/\p{Emoji_Presentation}/gu, '') // 移除Emoji
    .replace(/[^\w\s-]/g, '') // 移除其他特殊字符（保留字母数字、空格、连字符）
    .trim(); // 移除首尾空格

  return cleaned.toLowerCase().replace(/\s+/g, '-'); // 将空格转换为连字符，并转小写
}

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
}).use(MarkdownItKatex).use(MarkdownItAnchor, {
  slugify: customSlugify
});

export { md }