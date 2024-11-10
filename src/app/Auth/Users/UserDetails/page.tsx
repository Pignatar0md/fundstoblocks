"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

import Button from "@/app/components/Buttons/Button";
import { addUser, updateUser } from "@/app/services/appwrite/users";
import PhoneField from "@/app/components/Inputs/PhoneField";
import Face from "@/app/components/Icons/face";
import Email from "@/app/components/Icons/email";
import Password from "@/app/components/Icons/password";

export default function UserDetails() {
	const searchParams = useSearchParams();
	const operationType = searchParams.get("operationType");
	const userId = searchParams.get("id");

	const [user, setUser] = useState({
		name: "",
		password: "",
		email: "",
		phone: "",
	});

	const saveUser = async () => {
		const response = (await !userId)
			? addUser(user)
			: updateUser(user, userId as string);
		debugger;
		console.log(response);
	};

	const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
		setUser({ ...user, [target.name]: [target.value] });
	};

	return (
		<div className="flex lg:w-1/2 justify-center items-center space-y-8">
			<div className="w-full px-8 md:px-32 lg:px-24">
				<form action={saveUser} className="bg-white rounded-md shadow-2xl p-5">
					<h1 className="text-gray-800 font-bold text-2xl mb-5">
						{operationType === "add" ? "Crear" : "Editar"} usuario
					</h1>
					<div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl ">
						<Face />
						<input
							className="pl-2 w-full outline-none border-none"
							type="text"
							name="name"
							value={user.name}
							onChange={handleChange}
							id="name"
							placeholder="Nombre"
						/>
					</div>
					<div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl ">
						<Email />

						<input
							className="pl-2 w-full outline-none border-none"
							type="text"
							name="email"
							id="email"
							value={user.email}
							onChange={handleChange}
							placeholder="Dirección de e-mail"
						/>
					</div>
					<div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
						<PhoneField value={user.phone} onChange={handleChange} />
					</div>

					<div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl ">
						<Password />
						<input
							className="pl-2 w-full outline-none border-none"
							type="password"
							value={user.password}
							onChange={handleChange}
							name="password"
							id="password"
							placeholder="Clave"
						/>
					</div>
					<Button text={!userId ? "Agregar" : "Actualizar"} type="submit" />
				</form>
			</div>
		</div>
	);
}
