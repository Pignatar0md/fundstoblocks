import { MouseEventHandler } from "react";

export default function Button({
	text,
	type,
	onPress,
}: {
	text: string;
	type: "submit" | "button";
	onPress?: MouseEventHandler<HTMLButtonElement>;
}) {
	const className =
		"block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2";

	const component =
		type === "button" ? (
			<button onClick={onPress} type={type} className={className}>
				{text}
			</button>
		) : (
			<button type={type} className={className}>
				{text}
			</button>
		);

	return component;
}
