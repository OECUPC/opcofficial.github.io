import { Head } from "$fresh/runtime.ts";
import { render } from "https://deno.land/x/gfm@0.6.0/mod.ts";

import { MDParser } from "../tools/MDParser.ts";
import RenderBlog from "../tools/RenderBlog.tsx";

import { BlogType } from "../tools/utils.ts";
import { GetBlogTypeNameFromType } from "../tools/GetBlogTypeNameFromType.ts";

interface Data{
    id: string,
    type: BlogType
};

export default function BlogArticle({ id, type }: Data) {
    const path = `./static/post/${type}/${id}/index.md`;

    const typeName = GetBlogTypeNameFromType(type);

    try{
        const text = Deno.readTextFileSync(path);

        const md = MDParser(text);

        const body = render(md.body);

        return RenderBlog(body, md.meta, type);
    }catch(e){
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