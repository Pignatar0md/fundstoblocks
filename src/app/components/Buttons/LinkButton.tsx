import Link from "next/link";

export default function LinkButton({
	url,
	text,
	customStyle,
}: {
	url: string;
	text: string;
	customStyle?: string;
}) {
	return (
		<Link href={url} className={`text-blue-600 hover:underline ${customStyle}`}>
			{text}
		</Link>
	);
}
