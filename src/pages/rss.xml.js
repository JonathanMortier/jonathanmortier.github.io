import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const posts = (await getCollection("blog")).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );
  return rss({
    title: "Blog de Jonathan Mortier",
    description: "Notes et astuces de développement : Java, Maven, Git, JavaScript, Ubuntu.",
    site: context.site,
    customData: "<language>fr-FR</language>",
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.id}/`,
      categories: post.data.tags,
    })),
  });
}
