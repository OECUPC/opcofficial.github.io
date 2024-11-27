// 目次
interface Data {
	title: string,
	entries: string[];
}

export function TOCContainer(data: Data) {
	return (
		<div className="toc-container no-select">
			<label className="toc-container__title">
				<h2>{data.title}</h2>
				<input type="checkbox" />
			</label>

			<ul className="toc-container__list">
				{data.entries.map(entry => (
					<li><a href={`#${entry}`}>{entry}</a></li>
				))}
			</ul>
		</div>
	);
}