import { Head } from "$fresh/runtime.ts";
import { PageProps } from "$fresh/server.ts";
import { CSS, render } from "https://deno.land/x/gfm@0.6.0/mod.ts";

import { MDParser, Meta } from "../../tools/MDParser.ts";

// syntax highlight from https://unpkg.com/browse/prismjs@1.29.0/components/

import "https://esm.sh/prismjs@1.29.0/components/prism-c?no-check";
import "https://esm.sh/prismjs@1.29.0/components/prism-cpp?no-check";
import "https://esm.sh/prismjs@1.29.0/components/prism-python?no-check";

const RenderPage = (body: string, meta: Meta)=>{
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
                <article data-color-mode="light" data-light-theme="light" data-dark-theme="dark" class="markdown-body"
                    dangerouslySetInnerHTML={{__html: body}}>

                </article>
            </main>
        </>
    )
}

export default function Home(props: PageProps){
    const path = `./static/blogs/${props.params.name}.md`;

    try{
        const text = Deno.readTextFileSync(path);

        const md = MDParser(text);

        const body = render(md.body);

        return RenderPage(body, md.meta);
    }catch(e){
        return (
            <>
      <Head>
        <title>404 - Page not found</title>
      </Head>
      <main className="hero center-align">
        <h1 className="hero__title">404 - Page not found</h1>
        <p className="hero__description">
          お探しの記事は見つかりませんでした。
        </p>
        <a href="/blogs">記事一覧に戻る</a>
      </main>
    </>
        )
    }
}