"use client";
import GreenCheck from "@/app/components/Icons/greenCheck";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
	const searchParams = useSearchParams();
	const userOperationType = searchParams.get("type");
	const subtitle =
		userOperationType === "register"
			? "Esperamos que puedas sacar el máximo provecho trabajando con nosotros."
			: "Recibirás un e-mail o sms con el enlace para resetear tu clave y seguir trabajando con nosotros.";
	return (
		<div className="h-screen my-12">
			<div className="bg-white p-6 md:mx-auto">
				<GreenCheck />
				<div className="text-center">
					<h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
						Éxito!
					</h3>
					<div className=" md:mx-auto w-96">
						<p className="text-gray-600 my-6">{subtitle}</p>
					</div>
					<p>Ten un buen día!</p>
					<div className="py-10 text-center">
						<Link
							href="/"
							className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-2xl"
						>
							Ir a ingreso
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
