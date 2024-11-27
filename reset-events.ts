import "$std/dotenv/load.ts";

console.log(Deno.env.get(Deno.args[0]));
const kv = await Deno.openKv(Deno.env.get(Deno.args[0]));

for await (const entry of kv.list({ prefix: [] })) {
	console.log(entry);
	await kv.delete(entry.key);
}