import { Head } from "$fresh/runtime.ts";
import { CSS } from "https://deno.land/x/gfm@0.6.0/mod.ts";

// syntax highlight from https://unpkg.com/browse/prismjs@1.29.0/components/

import "https://esm.sh/prismjs@1.29.0/components/prism-c?no-check";
import "https://esm.sh/prismjs@1.29.0/components/prism-cpp?no-check";
import "https://esm.sh/prismjs@1.29.0/components/prism-python?no-check";

import { Meta } from "./MDParser.ts";

import { GetBlogTypeNameFromType } from "./GetBlogTypeNameFromType.ts";
import { BlogType } from "./utils.ts";

export default function RenderBlog(body: string, meta: Meta, type: BlogType){
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

                <a href={`/${type}`}>{`${GetBlogTypeNameFromType(type)}一覧に戻る`}</a>
            </main>
        </>
    )
}