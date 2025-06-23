declare module 'markdown-it-katex' {
  import MarkdownIt from 'markdown-it';

  // 这是一个 markdown-it 插件，通常是一个函数，接受 markdown-it 实例和可选的选项
  function markdownItKatex(md: MarkdownIt, options?: any): void;

  // 如果它默认导出，则使用 export default
  export default markdownItKatex;
}