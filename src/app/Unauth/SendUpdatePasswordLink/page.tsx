"use client";
import Button from "@/app/components/Buttons/Button";
import Email from "@/app/components/Icons/email";
import PhoneField from "@/app/components/Inputs/PhoneField";
import SideScreen from "@/app/components/SideScreen";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ChangeEvent } from "react";

export default function SendUpdatePasswordLinkPage() {
	const sendOTP = () => {
		redirect("/Unauth/Success?type=updatePassword");
	};
	return (
		<div className="h-screen flex">
			<SideScreen />
			<div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
				<div className="w-full px-8 md:px-32 lg:px-24">
					<form action={sendOTP} className="bg-white rounded-md shadow-2xl p-5">
						<h1 className="text-gray-800 font-bold text-2xl mb-1">
							Reseteo de clave
						</h1>
						<p className="text-sm font-normal text-gray-600 mb-8">
							Ingresa el e-mail y número de celular para enviarte el enlace de
							reseteo de clave.
						</p>
						<div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
							<Email />
							<input
								id="email"
								className=" pl-2 w-full outline-none border-none"
								type="email"
								name="email"
								placeholder="dirección de e-mail"
							/>
						</div>
						<div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
							<PhoneField
								value={""}
								onChange={function (a: ChangeEvent<HTMLInputElement>): void {
									throw new Error("Function not implemented." + a);
								}}
							/>
						</div>
						<Button text="Enviar" type="submit" />
						<div className="text-sm font-medium text-gray-900">
							Has recordado tu clave?{" "}
							<Link href="/" className="text-blue-600 hover:underline">
								Ir a ingreso
							</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
