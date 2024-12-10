import { rehype } from "rehype";
import rehypeHighlight from "rehype-highlight";
import { remark } from "remark";
import remarkHtml from "remark-html";
import remarkGfm from "remark-gfm";

export default async function convertMarkdownToHtml(
  content: string,
) {
  let blogHtml = await remark()
    .use(remarkGfm)
    .use(remarkHtml)
    .process(content);
  let blogContent = blogHtml.toString();
  const result = await rehype()
    .data("settings", { fragment: false })
    .use(rehypeHighlight)
    .process(blogContent);
  return result;
}
