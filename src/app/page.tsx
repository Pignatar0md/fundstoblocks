"use client";
import { ChangeEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SideScreen from "./components/SideScreen";
import Modal from "./components/Modal";
import { getCurrentUser, signIn } from "./services/appwrite/users";

export default function Home() {
	const modalInitState = { show: false, title: "", message: "" };
	const [user, setUser] = useState({ email: "", password: "" });
	const [modal, setModal] = useState(modalInitState);
	const router = useRouter();

	const checkIsSession = async () => {
		const openedSession = await getCurrentUser();
		if (openedSession.code === 401) return;
		if (!!openedSession.name) {
			router.push("/Auth/Main/");
		}
	};

	useEffect(() => {
		checkIsSession();
	}, []);

	const handleSubmit = async () => {
		try {
			await signIn(user);
			router.push("/Auth/Main/");
		} catch (error: unknown) {
			if (error instanceof Error) {
				const errorMessage = error.message.split(".");
				setModal({
					show: true,
					title: errorMessage[0],
					message: errorMessage[1],
				});
			}
		}
	};

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		setUser({ ...user, [event.target.name]: event.target.value });
	};

	return (
		<div className="h-screen flex">
			<Modal
				showModal={modal.show}
				setShowModal={() => {}}
				title={modal.title}
				body={modal.message}
				acceptButtonText={"Ok"}
				onAccept={() => setModal(modalInitState)}
			/>
			<SideScreen />
			<div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
				<div className="w-full px-8 md:px-32 lg:px-24">
					<form
						action={handleSubmit}
						className="bg-white rounded-md shadow-2xl p-5"
					>
						<h1 className="text-gray-800 font-bold text-2xl mb-1">Hola!</h1>
						<p className="text-sm font-normal text-gray-600 mb-8">Bienvenido</p>
						<div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5 text-gray-400"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
								/>
							</svg>
							<input
								id="email"
								className=" pl-2 w-full outline-none border-none"
								type="email"
								value={user.email}
								onChange={onChange}
								name="email"
								placeholder="Email"
							/>
						</div>
						<div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl ">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5 text-gray-400"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
									clipRule="evenodd"
								/>
							</svg>
							<input
								className="pl-2 w-full outline-none border-none"
								type="password"
								name="password"
								value={user.password}
								onChange={onChange}
								id="password"
								placeholder="Clave"
							/>
						</div>
						<button
							type="submit"
							className="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
						>
							Ingresar
						</button>
						<div className="flex justify-between mt-4">
							<Link
								href="/Unauth/SendUpdatePasswordLink"
								className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all"
							>
								Olvidaste la clave?
							</Link>

							<Link
								href="/Unauth/Register"
								className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all"
							>
								Todavía no tienes cuenta?
							</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
