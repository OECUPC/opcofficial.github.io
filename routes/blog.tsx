import { Handlers, PageProps } from "$fresh/server.ts";
import { parseFeed, Feed } from "rss/mod.ts";

import ArticleCards from "../components/ArticleCards.tsx";
import { BlogType } from "../tools/utils.ts";

interface Data {
	feed: Feed
};

export const handler: Handlers<Data> = {
	async GET(_req, ctx) {

		const xml = await Deno.readTextFile("./static/post/blog.rss");
		const feed = await parseFeed(xml);

		return ctx.render({ feed });
	},
};

export default function Home({ data }: PageProps<Data>) {
	const feed: Feed = data.feed;

	console.log(feed);

	return (
		<ArticleCards title="ブログ" type={BlogType.blog} feed={feed} />
	);
}
