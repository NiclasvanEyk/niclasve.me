import rss from "@astrojs/rss";
import { SITE_TITLE } from "../consts";
import { allFeedItems } from "../utils/feed";

export async function GET(context) {
  return rss({
    title: SITE_TITLE,
    description: "Blog posts and projects by Niclas van Eyk",
    site: context.site,
    items: await allFeedItems(),
  });
}
