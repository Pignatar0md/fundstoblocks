"use client";
import { useQRCode } from "next-qrcode";

export default function QrGenerator({ info }: { info: string }) {
	const { Canvas } = useQRCode();

	return (
		<Canvas
			text={info}
			options={{
				errorCorrectionLevel: "M",
				margin: 3,
				scale: 4,
				width: 200,
				color: {
					dark: "#010599FF",
					light: "#FFBF60FF",
				},
			}}
		/>
	);
}
