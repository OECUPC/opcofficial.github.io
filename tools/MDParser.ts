export interface Meta{
    [key: string]: string | string[]
}

export function MDParser(text: string){
    const matchReg = new RegExp("(?<=---)[\\s\\S]*?(?=---)");
    const replaceReg = new RegExp("---[\\s\\S]*?---");

    // ---で囲まれている箇所の摘出と改行の削除
    const metaText = text.match(matchReg)?.at(0)?.trim();
    // ---を含む囲まれた箇所の削除
    const bodyText = text.replace(replaceReg, '');

    const meta: Meta = {};

    metaText?.split('\n').forEach(line =>{
        const index = line.indexOf(':');
        
        const key = line.substring(0, index).trim();
        const value = line.substring(index + 1).trim();

        // 値が配列形式の場合、それを配列に変換
        if (value.startsWith('[') && value.endsWith(']')) {
            meta[key] = value.slice(1, -1).split(',').map(item => item.trim());
        } else {
            meta[key] = value;
        }
    });

    return {
        meta: meta,
        body: bodyText
    }
}