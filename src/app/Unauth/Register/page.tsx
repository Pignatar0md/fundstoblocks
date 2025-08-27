"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { redirect } from "next/navigation";
import Web3 from "web3";

import Button from "@/app/components/Buttons/Button";
import LinkButton from "@/app/components/Buttons/LinkButton";
import PhoneField from "@/app/components/Inputs/PhoneField";
import SideScreen from "@/app/components/SideScreen";

import { createAdminUser, signUp } from "@/app/services/supabase/users";
import Face from "@/app/components/Icons/face";
import Email from "@/app/components/Icons/email";
import Password from "@/app/components/Icons/password";
import { web3Config } from "@/app/services/supabase/init";
// import Store from "@/app/components/Icons/store";

export default function RegisterPage() {
	const [checkbox, setCheckbox] = useState({
		privacyPolicies: false,
		termsAndConditions: false,
	});
	const [newUser, setNewUser] = useState({
		name: "",
		password: "",
		phone: "",
		email: "",
		ethAddr: "",
		ethPrivateKey: "",
	});

	useEffect(() => {
		const web3 = new Web3(
			`https://mainnet.infura.io/v3/${web3Config.INFURA_API_KEY}`
		);
		const ethAccount = web3.eth.accounts.create();
		setNewUser({
			...newUser,
			ethAddr: ethAccount.address,
			ethPrivateKey: ethAccount.privateKey,
		});
	}, []);

	const signupUser = async () => {
		await createAdminUser(newUser);
		await signUp({ email: newUser.email, password: newUser.password });
		redirect("/Unauth/Success?type=register");
	};

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		setNewUser({ ...newUser, [event.target.name]: event.target.value });
	};

	return (
		<div className="h-screen flex">
			<SideScreen />
			<div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
				<div className="w-full px-8 md:px-32 lg:px-24">
					<form
						action={signupUser}
						className="bg-white rounded-md shadow-2xl p-5"
					>
						<h1 className="text-gray-800 font-bold text-2xl mb-1">
							Info básica
						</h1>
						<p className="text-sm font-normal text-gray-600 mb-8">
							Sólo para que puedas acceder y utilizar nuestra plataforma.
						</p>
						<div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl ">
							<Face />
							<input
								className="pl-2 w-full outline-none border-none"
								type="text"
								name="name"
								id="name"
								onChange={onChange}
								value={newUser.name}
								placeholder="Nombre"
							/>
						</div>
						{/* <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl ">
							<Store />
							<input
								className="pl-2 w-full outline-none border-none"
								type="text"
								name="storeName"
								id="storeName"
								onChange={onChange}
								value={newUser.storeName}
								placeholder="Nombre de Comercio"
							/>
						</div> */}
						<div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
							<Email />
							<input
								id="email"
								className=" pl-2 w-full outline-none border-none"
								type="email"
								onChange={onChange}
								value={newUser.email}
								name="email"
								placeholder="Dirección de e-mail"
							/>
						</div>
						<div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
							<Password />
							<input
								className="pl-2 w-full outline-none border-none"
								onChange={onChange}
								value={newUser.password}
								type="password"
								name="password"
								id="password"
								placeholder="Clave"
							/>
						</div>
						<div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
							<PhoneField value={newUser.phone} onChange={onChange} />
						</div>
						<Button type="submit" text="Enviar" />
						<div className="flex justify-between mt-4">
							<div className="flex items-center items-start mb-4">
								<input
									id="checkbox-1"
									aria-describedby="checkbox-1"
									type="checkbox"
									onChange={() =>
										setCheckbox({
											...checkbox,
											termsAndConditions: !checkbox.termsAndConditions,
										})
									}
									className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded"
									checked={checkbox.termsAndConditions}
								/>
								<label
									htmlFor="checkbox-1"
									className="text-sm ml-3 font-medium text-gray-900"
								>
									Acepto los{" "}
									<LinkButton url="#" text="términos y condiciones" />
								</label>
							</div>
							<div className="flex items-center items-start mb-4">
								<input
									id="checkbox-1"
									aria-describedby="checkbox-1"
									type="checkbox"
									onChange={() =>
										setCheckbox({
											...checkbox,
											privacyPolicies: !checkbox.privacyPolicies,
										})
									}
									className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded"
									checked={checkbox.privacyPolicies}
								/>

								<label
									htmlFor="checkbox-1"
									className="text-sm ml-3 font-medium text-gray-900"
								>
									Ya leí las{" "}
									<LinkButton
										url="/Unauth/RegisterSuccess"
										text="políticas de privacidad"
									/>
								</label>
							</div>
						</div>
						<div className="text-sm font-medium text-gray-900">
							Ya tienes una cuenta? <LinkButton text="Ir a ingreso" url="/" />
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
