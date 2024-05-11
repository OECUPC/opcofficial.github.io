import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async POST(req) {
    try {
        await Deno.writeTextFile("hello.txt", "Hello World!aaaa");
        return new Response("successfully", {status: 200});
    }catch(err){
        console.error(err);
        return new Response("failed", { status: 500 });
    }
  }
}