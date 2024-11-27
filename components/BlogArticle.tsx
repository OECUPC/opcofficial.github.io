import { Head } from "$fresh/runtime.ts";
import { render, CSS } from "@deno/gfm";

// syntax highlight from https://unpkg.com/browse/prismjs@1.29.0/components/

import "https://esm.sh/prismjs@1.29.0/components/prism-c?no-check";
import "https://esm.sh/prismjs@1.29.0/components/prism-cpp?no-check";
import "https://esm.sh/prismjs@1.29.0/components/prism-python?no-check";

import { Meta, MDParser } from "../tools/MDParser.ts";

import { BlogType } from "../tools/utils.ts";
import { GetBlogTypeNameFromType } from "../tools/GetBlogTypeNameFromType.ts";
import { TOCContainer } from "./TOCContainer.tsx";

interface Data {
	id: string,
	type: BlogType
};

function RenderBlog(body: string, meta: Meta, topics: string[], type: BlogType) {
	return (
		<>
			<Head>
				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism.min.css" />
				<style>
					{CSS}
				</style>
			</Head>
			<main class="center-align">
				<h1>{meta.title}</h1>

				<TOCContainer title="目次" entries={topics} />

				<article data-color-mode="light" data-light-theme="light" data-dark-theme="dark" class="markdown-body"
					dangerouslySetInnerHTML={{ __html: body }}>

				</article>

				<a href={`/${type}`}>{`${GetBlogTypeNameFromType(type)}一覧に戻る`}</a>
			</main>
		</>
	)
}

export default function BlogArticle({ id, type }: Data) {
	const path = `./static/post/${type}/${id}/index.md`;

	const typeName = GetBlogTypeNameFromType(type);

	try {
		const text = Deno.readTextFileSync(path);

		const md = MDParser(text);

		const body = render(md.body);

		return RenderBlog(body, md.meta, md.topics, type);
	} catch (e) {
		return (
			<>
				<Head>
					<title>404 - Page not found</title>
				</Head>
				<main className="hero center-align">
					<h1 className="hero__title">404 - Page not found</h1>
					<p className="hero__description">
						お探しの{typeName}は見つかりませんでした。
					</p>
					<a href={`/${type}`}>{typeName}一覧に戻る</a>
				</main>
			</>
		);
	}
}