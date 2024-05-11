import { Feed, parseFeed } from "rss/mod.ts";
import { FeedEntry } from "rss/src/types/feed.ts";

import { MDParser } from "./tools/MDParser.ts";

const postDir = './static/post/';

enum PostType {
    Blog = "blog",
    Activitie = "activitie"
};

const MaxDescriptionChars = 50;

async function fileExists(filepath: string): Promise<boolean> {
    try {
         const file = await Deno.stat(filepath);   
         return file.isFile;
     } catch (_e) {
         return false;
     }
}  

const saveRSS = (savePath: string, rss: Feed) =>{
    const fileText =
`<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
    <channel>
        <title>${rss.title.value}</title>
        <link>${rss.links[0]}</link>
        <description>${rss.description}</description>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        <docs>http://rsss.law.harvard.edu/tech/rss</docs>
        <language>${rss.language}</language>
        <generator>OPCMS</generator>
        ${rss.entries.map(entry=>`
        <item>
            <title>${entry.title?.value}</title>
            ${
                entry.links.map(link=>
                    `<link>${link.href}</link>\n`
                ) || ""
            }
            <description>
${entry.description?.value}
            </description>
            <pubDate>${
                entry.published?.toUTCString()
            }</pubDate>
            <guid isPermalink="false">${entry.id}</guid>
            ${
                entry.categories?.map(category=>
                    `<category>${category.label}</category>`
                ).join('') || ""
            }
            <enclosure url="${entry.attachments?.at(0)?.url}" length="${entry.attachments?.at(0)?.sizeInBytes}" type="${entry.attachments?.at(0)?.mimeType}" />
        </item>`).join('\n')}
    </channel>
</rss>`;

    Deno.writeTextFileSync(savePath, fileText);
}

const updateRSS = async (type: PostType)=>{

    const baseDir = `${postDir}${type}`;
    const rssPath = `${postDir}${type}.rss`;

    const rssFeed = await parseFeed(await Deno.readTextFile(rssPath));

    const items = [];

    // console.log(rssFeed);

    for await(const entry of Deno.readDir(baseDir)){
        const noImagePath = "./static/images/no_image.png";

        const articlePath = `${baseDir}/${entry.name}/index.md`;
        const articleImagePath = `${baseDir}/${entry.name}/thumbnail.png`;
        const articleId = `oecupc-${type}://${entry.name}`;
        
        const article = Deno.readTextFileSync(articlePath);

        const attachmentPath = (await fileExists(articleImagePath)) ? articleImagePath:noImagePath;

        const md = MDParser(article);

        /*
        console.log("--- load ---");
        console.log("meta: " + JSON.stringify(md.meta));
        console.log(`body:\n${md.body}`);
        console.log(`--- EOF ---`);
        */

        const item: FeedEntry = {
            title: {
                type: "text",
                value: md.meta.title
            },
            description: {
                type: "text",
                value: md.body.substring(0, MaxDescriptionChars)
            },
            links: [],
            id: articleId,
            author: {
                name: md.meta.author
            },
            categories: md.meta.categories.map((category=>({
                term: category,
                label: category
            }))),
            attachments: [{
                mimeType: "image/png",
                url: `https://raw.githubusercontent.com/OECUPC/opcofficial/fresh_dev/${attachmentPath.substring(2)}`,
                sizeInBytes: Deno.statSync(attachmentPath).size
            }]
        }

        items.push(item);
    }

    const entries = items.map(item=>{
        const entry = rssFeed.entries.find(entry=>entry.id === item.id);
        
        if(entry !== undefined){
            item.published = entry.published;

            return item;
        }

        item.published = new Date();
        
        return item;
    });

    rssFeed.entries = entries;

    saveRSS(rssPath, rssFeed);
};

function main(){
    updateRSS(PostType.Blog);
    updateRSS(PostType.Activitie);
}

main();