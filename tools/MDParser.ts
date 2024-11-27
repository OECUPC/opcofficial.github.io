const TopicPrefix = "## ";

const matchReg = new RegExp("(?<=---)[\\s\\S]*?(?=---)");
const replaceReg = new RegExp("---[\\s\\S]*?---");

export interface Meta {
  title: string;
  author: string;
  categories: string[];
  description: string;
  [key: string]: string | string[];
}

export function MDParser(text: string) {
  // ---で囲まれている箇所の摘出と改行の削除
  const metaText = text.match(matchReg)?.at(0)?.trim();
  // ---を含む囲まれた箇所の削除
  const bodyText = text.replace(replaceReg, "").trim();

  const meta: Meta = {
    title: "",
    categories: [],
    author: "",
    description: "",
  };

  metaText?.split("\n").forEach((line) => {
    const index = line.indexOf(":");

    const key = line.substring(0, index).trim();
    const value = line.substring(index + 1).trim();

    // 値が配列形式の場合、それを配列に変換
    if (value.startsWith("[") && value.endsWith("]")) {
      meta[key] = value.slice(1, -1).split(",").map((item) => item.trim());
    } else {
      meta[key] = value;
    }
  });

  const topics = bodyText.split("\n").filter((line) => {
    return line.startsWith(TopicPrefix);
  }).map((line) => line.substring(TopicPrefix.length).trim());

  console.log(topics);

  return {
    meta: meta,
    body: bodyText,
    topics: topics,
  };
}
