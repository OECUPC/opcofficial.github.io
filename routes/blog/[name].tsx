import { PageProps } from "$fresh/server.ts";

import BlogArticle from "../../components/BlogArticle.tsx";
import { BlogType } from "../../tools/utils.ts";

export default function Home(props: PageProps) {
	return <BlogArticle id={props.params.name} type={BlogType.blog} />
}