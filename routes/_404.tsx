import { Head } from "$fresh/runtime.ts";

export default function Error404() {
	return (
		<>
			<head>
				<title>404 - Page not found</title>
			</head>
			<main>
				<div  className="hero center-align">
					<h1 className="hero__title">404 - Page not found</h1>
					<p className="hero__description">
						お探しのページは見つかりませんでした。
					</p>
					<a href="/">ホームに戻る</a>
				</div>
			</main>
		</>
	);
}
