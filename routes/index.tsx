import { Handlers, PageProps } from "$fresh/server.ts";
import { ScheduledEventData } from "../tools/utils.ts";

interface Data {
  scheduledEvent: ScheduledEventData[];
}

export const handler: Handlers<Data> = {
  async GET(_req, ctx) {
    const databaseUrl = Deno.env.get("KV_DATABASE_URL");
    const kv = await (databaseUrl ? Deno.openKv(databaseUrl) : Deno.openKv());

    const data = await kv.get<ScheduledEventData[]>(["scheduledEvent"]);

    // console.log(data);

    if (!data.value) {
      return ctx.render({ scheduledEvent: [] });
    }

    return ctx.render({ scheduledEvent: data.value });
  },
};

export default function Home({ data }: PageProps<Data>) {
  return (
    <main>
      {/* hero */}
      <div className="hero">
        <h1 className="hero__title">OECUPC</h1>
        <p className="hero__description typing">OECU Programming Circle</p>
      </div>
      <div>
        <h2>どんなサークル？</h2>
        <p>主に、プログラミングをゆるく楽しむサークルです！</p>
        <a href="/about">詳しくはこちらまで</a>
        <h2>予定されているイベント</h2>
        <article className="scheduled-event">
          {data.scheduledEvent.length <= 0
            ? (
              <section className="scheduled-event__content--none">
                <p>現在予定されているイベントはありません。</p>
              </section>
            )
            : data.scheduledEvent?.sort((a, b) => {
              return b.status - a.status;
            })?.map((event) => (
              <section
                className={"scheduled-event__content" +
                  (event.status === 2
                    ? " scheduled-event__content--active"
                    : "")}
              >
                <h3>{event.name}</h3>
                <p>場所: {event.location}</p>
                <p>
                  開始予定時刻: {new Date(event.start).toLocaleString("ja-JP")}
                </p>
                <p>
                  終了予定時刻: {event.end === undefined
                    ? "未定"
                    : new Date(event.end).toLocaleString("ja-JP")}
                </p>
              </section>
            ))}
        </article>
      </div>
      <div>
        <h2>サークル公式X</h2>
        <a
          class="twitter-timeline"
          data-height="600"
          href="https://twitter.com/oecuprogramming?ref_src=twsrc%5Etfw"
        >
          OECUプログラミングサークルさんのポスト
        </a>
        <script
          async
          src="https://platform.twitter.com/widgets.js"
          charset="utf-8"
        >
        </script>
      </div>
    </main>
  );
}
