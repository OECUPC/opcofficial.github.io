import { Head } from "$fresh/runtime.ts";
import { CSS, render } from "https://deno.land/x/gfm@0.6.0/mod.ts";

import { useState } from "preact/hooks";

interface PostType {
  name: string;
  type: string;
}

const PostTypes: PostType[] = [
  {
    name: "ブログ",
    type: "blog",
  },
  {
    name: "活動履歴",
    type: "activitie",
  },
];

function SendPost(type: string, title: string, categories: string, body: string) {
    console.log(`type: ${type}\ntitle: ${title}\ncategories: ${categories}\nbody:\n\n${body}`);

    const markdown =
        `---\ntitle: ${title}\ncategories: [${categories?.split(' ') || ''}]\n---\n${body}`;
    
    console.log(markdown);

    (async ()=>{
        console.log(await fetch('/api/post', { method: 'POST' }));
    })();
}

export default function Poster() {
    const [postType, setPostType] = useState<string>(PostTypes[0].type);

    const [titleText, setTitleText] = useState<string>();

    const [categoriesText, setCategoriesText] = useState<string>();

    const [markdownText, setMarkdownText] = useState<string>();
    return (
        <>
            <Head>
                <link rel="stylesheet" href="/styles/css/form.css" />

                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism.min.css" />
                <style>
                    {CSS}
                </style>
            </Head>
            <div>
                <p>投稿する記事の種類を選択</p>
                <select id="script-post-type" className="form-select"
                    onChange={(ev: any)=>setPostType(ev.target.value)}>
                {PostTypes.map((postType) => (
                    <option value={postType.type}>{postType.name}</option>
                ))}
                </select><br />
                <input id="script-post-title" className="form-input"
                    type="text" placeholder="記事タイトル" 
                    onChange={(ev: any)=>setTitleText(ev.target.value)}/><br />
                <input id="script-post-categories" className="form-input"
                    type="text" placeholder="記事のタグ(スペース区切り)"
                    onChange={(ev: any)=>setCategoriesText(ev.target.value)}/>
            </div>
            <div class="markdown-preview-container">
                    <div class="markdown-preview-container__editor">
                        <textarea id="script-markdown-editor" placeholder="記事をMarkdown記法書く"
                            onKeyUp={(ev: any)=>setMarkdownText(ev.target.value)}></textarea>
                    </div>
                    <div data-color-mode="light" data-light-theme="light" data-dark-theme="dark" class="markdown-body markdown-preview-container__preview"
                        dangerouslySetInnerHTML={{__html: render(markdownText?.replaceAll('\n', '\r\n') || "")}}></div>
                </div>
            <button className="form-button" onClick={(ev)=>{
                if(titleText === undefined) {
                    alert("タイトルが空です");
                    return;
                }
                if(markdownText === undefined){
                    alert("内容が空です");
                    return;
                }

                SendPost(postType, titleText, categoriesText, markdownText)
            }}>投稿</button>
        </>
    );
}
