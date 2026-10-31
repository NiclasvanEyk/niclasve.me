import { getCollection, type CollectionEntry } from "astro:content";
import MarkdownIt from "markdown-it";
import sanitizeHtml from "sanitize-html";
import { article, project } from "@/links";

const parser = new MarkdownIt();

/**
 * Terminal recordings pasted into content can carry ANSI escape sequences and
 * other control characters that are not valid in XML, which makes the whole
 * feed unparseable. Strip them from the rendered HTML.
 */
function toXmlSafeHtml(html: string): string {
  return html
    .replace(/\u001b\[[0-9;?]*[ -/]*[@-~]/g, "") // ANSI escape sequences
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");
}

export type FeedItem = {
  title: string;
  description: string;
  pubDate: Date;
  link: string;
  content: string;
};

function toItem(
  entry: CollectionEntry<"blog"> | CollectionEntry<"projects">,
  link: string,
): FeedItem | null {
  const pubDate =
    "pubDate" in entry.data
      ? (entry.data.updatedDate ?? entry.data.pubDate)
      : entry.data.startedAt;

  if (!pubDate) {
    return null;
  }

  return {
    title: entry.data.title,
    description: entry.data.description,
    pubDate,
    link,
    content: toXmlSafeHtml(sanitizeHtml(parser.render(entry.body ?? ""))),
  };
}

/** Blog posts and projects, newest first. */
export async function allFeedItems(): Promise<FeedItem[]> {
  const [posts, projects] = await Promise.all([
    getCollection("blog", (entry) => Boolean(entry.data.pubDate)),
    getCollection("projects"),
  ]);

  return [
    ...posts.map((post) =>
      toItem(post, article(post.id.replace(/\.md$/, ""))),
    ),
    ...projects.map((entry) =>
      toItem(entry, project(entry.id.replace(/\.md$/, ""))),
    ),
  ]
    .filter((item): item is FeedItem => item !== null)
    .sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());
}
