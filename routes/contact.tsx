import ExternalLink from "../components/ExternalLink.tsx"

export default function Home(){
	const BaseFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSc41n7G9mhWQTvSMO-TtqL8Hd-sejOb5ZkS4thMES0f57N7fA/";
	return (
		<main>
			<article>
				<h1 className="center-align">お問い合わせ</h1>
				<section>
					<p>
						以下の埋め込みフォーム、
					</p>
					<p>
						または
						<ExternalLink name="こちらのリンク" href={`${BaseFormURL}viewform?usp=sf_link`} />
						よりご連絡ください。
					</p>
				</section>
				<iframe
					className="google-form-embed"
					src={`${BaseFormURL}viewform?embedded=true`}
				>
					読み込んでいます…
				</iframe>
			</article>
		</main>
	)
}