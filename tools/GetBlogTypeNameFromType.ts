import { BlogType } from "./utils.ts"

export function GetBlogTypeNameFromType(type: BlogType){
    return type === BlogType.blog ? "ブログ":"活動"
};