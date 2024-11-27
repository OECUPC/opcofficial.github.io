import IconLink from "tabler_icons/link.tsx";

import IconBrandGithub from "tabler_icons/brand-github.tsx";
import IconBrandX from "tabler_icons/brand-x.tsx";

interface Prop {
	name: string;
	href: string;
}

const IconMap = [
	{
		href: "https://github.com/",
		element: IconBrandGithub,
	},
	{
		href: "https://x.com",
		element: IconBrandX,
	}
];

export default function ExternalLink({ href, name }: Prop) {
	const findIndex = IconMap.findIndex((obj) => href.startsWith(obj.href));
	const IconComponent = 0 <= findIndex ? IconMap[findIndex].element : IconLink;

	return (
		<a href={href} className="external-link" target="_blank">
			<IconComponent className="external-link__icon" />
			{name}
		</a>
	);
}
