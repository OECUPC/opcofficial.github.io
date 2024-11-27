import { Handlers } from "$fresh/server.ts";
import { ScheduledEventData } from "../../tools/utils.ts";

export const handler: Handlers = {
  async POST(req, _ctx) {
    try {
      if (req.headers.get("X-API-Key") !== Deno.env.get("POST_API_KEY")) {
        throw Error(`Not allowed api key: ${req.headers.get("X-API-Key")}`);
      }

      const json: ScheduledEventData = await req.json();

      // KV_DATABASE_URLが設定されていないとき(deploy上)ではopenKv();
      const databaseUrl = Deno.env.get("KV_DATABASE_URL");
      const kv = await (databaseUrl ? Deno.openKv(databaseUrl) : Deno.openKv());

      const data = await kv.get<ScheduledEventData[]>(["scheduledEvent"]);

      const setValue = (!data.value)
        ? (json.status === 3) ? [] : [json]
        : (json.status === 3)
        ? data.value?.filter((event) => event.id !== json.id)
        : (data.value?.some((event) => event.id === json.id))
        ? data.value.map((event) => (event.id === json.id) ? json : event)
        : [...data.value, json];

      console.log(`updated: ${setValue}`);

      await kv.set(["scheduledEvent"], setValue);

      return new Response(null, { status: 200 });
    } catch (err) {
      console.log(err);

      return new Response(null, { status: 400 });
    }
  },
};
