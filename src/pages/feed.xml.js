import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";
import { article } from "../links"
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";

const parser = new MarkdownIt();

export async function GET(context) {
  const posts = await getCollection("blog", entry => entry.data.pubDate);

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => ({
      ...post.data,
      link: article(post.slug),
      content: sanitizeHtml(parser.render(post.body)),
    })),
    // TODO: Maybe add a specific stylesheet for RSS
  });
}
