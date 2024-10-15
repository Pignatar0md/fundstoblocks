import Link from "next/link";

export default function ImageButton({
	type,
	children,
	url,
	onPress,
}: {
	type: "button" | "link";
	children: React.ReactNode;
	url?: string;
	onPress?: () => void;
}) {
	if (type === "link" && url !== undefined) {
		return <Link href={url}>{children}</Link>;
	}
	if (type === "button") {
		return <button onClick={onPress}>{children}</button>;
	}
}
