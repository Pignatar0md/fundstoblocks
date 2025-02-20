"use client";

import Password from "@/app/components/Icons/password";
import SideScreen from "@/app/components/SideScreen";

// import Link from "next/link";

export default function ResetPasswordPage() {
	const handleSubmit = () => {};
	return (
		<div className="h-screen flex">
			<SideScreen />
			<div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
				<div className="w-full px-8 md:px-32 lg:px-24">
					<form
						action={handleSubmit}
						className="bg-white rounded-md shadow-2xl p-5"
					>
						<h1 className="text-gray-800 font-bold text-2xl mb-1">
							Reseteo de clave
						</h1>
						<p className="text-sm font-normal text-gray-600 mb-8">
							Define y confirma tu nueva clave.
						</p>
						<div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
							<Password />
							<input
								className="pl-2 w-full outline-none border-none"
								type="password"
								name="password"
								id="password"
								placeholder="Define una clave"
							/>
						</div>
						<div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl ">
							<Password />
							<input
								className="pl-2 w-full outline-none border-none"
								type="password"
								name="password"
								id="password"
								placeholder="Reingresa la clave"
							/>
						</div>
						<button
							type="submit"
							className="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
						>
							Guardar
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
