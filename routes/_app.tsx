import { type PageProps } from "$fresh/server.ts";

import { Head } from "$fresh/runtime.ts";

import { Header } from "../components/Header.tsx";
import { Footer } from "../components/Footer.tsx"

export default function App({ Component }: PageProps) {
	return (
		<html>
			<Head>
				{/* メタ */}
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />


				{/* タイトル */}
				<title>OECUプログラミングサークル</title>
				<meta property="og:title" content="OECUプログラミングサークル" />

				{/* OGP */}
				<meta name="description" content="OECUPCは、大阪電気通信大学内で活動しているプログラミングサークルです。競技プログラミングへの参加や勉強会など、様々な活動を通じてプログラミングスキルの向上を目指しています。興味のある方は、ぜひ参加してみてください。" />
				<meta property="og:description" content="OECUPCは、大阪電気通信大学内で活動しているプログラミングサークルです。競技プログラミングへの参加や勉強会など、様々な活動を通じてプログラミングスキルの向上を目指しています。興味のある方は、ぜひ参加してみてください。" />
				<meta property="og:url" content="https://oecupc.github.io/opcofficial/index.html" />
				<meta property="og:image"
					content="https://raw.githubusercontent.com/OECUPC/opcofficial/main/images/favicon/icon-512x512.png" />
				<meta name="twitter:card" content="summary" />

				{/* サイト アイコン */}
				<link rel="apple-touch-icon" type="image/png" href="/images/favicon/apple-touch-icon-180x180.png" />
				<link rel="icon" type="image/png" href="/images/favicon/icon-192x192.png" />

				{/* フォント読み込み */}
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
				<link href="https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@500&display=swap" rel="stylesheet" />

				{/* スタイル適用 */}
				<link rel="stylesheet" href="/styles/css/main.css" />
				<link rel="stylesheet" href="/styles/css/header.css" />
				<link rel="stylesheet" href="/styles/css/footer.css" />
			</Head>
			<body>
				<Header />
				<Component />
				<Footer />
			</body>
		</html>
	);
}
