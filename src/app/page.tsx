"use client";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SideScreen from "./components/SideScreen";
import Modal from "./components/Modal";
import { getAdminUserByEmail, signIn } from "./services/supabase/users";
import Email from "./components/Icons/email";
import Password from "./components/Icons/password";
import { loggedInUserStorageKeys } from "./services/supabase/init";
import { getNetworks } from "./services/supabase/networks";
import { getCurrencies } from "./services/supabase/currencies";
import { StoreContext } from "@/state/GlobalProvider";
import { saveSessionInfo, saveUserInfo } from "./helpers/storage/saveInfo";
import { getWallets } from "./services/supabase/wallets";
import { Wallet } from "@/types/Wallet";
import { Network } from "@/types/Network";
import { Currency } from "@/types/Currency";

export default function Home() {
	const modalInitState = { show: false, title: "", message: "" };
	const { setCurrencies, setNetworks, setWallets } = useContext(StoreContext);
	const [user, setUser] = useState({ email: "", password: "" });
	const [modal, setModal] = useState(modalInitState);
	const router = useRouter();

	const checkIsSession = async () => {
		try {
			const openedSession = await sessionStorage.getItem(
				loggedInUserStorageKeys.email
			);
			if (!!openedSession) {
				router.push("/Auth/Main/");
			}
		} catch (error) {
			console.info(error);
		}
	};

	useEffect(() => {
		checkIsSession();
	}, []);

	const handleLogin = async () => {
		try {
			const signInResult = await signIn(user);
			if (signInResult && signInResult.user) {
				const loggedInUserData = await getAdminUserByEmail(
					signInResult.user.email!
				);
				const walletsResponse = await getWallets();
				const networksResponse = await getNetworks();
				const currenciesResponse = await getCurrencies();
				setWallets(walletsResponse.data as unknown as Wallet[]);
				setNetworks(networksResponse as Network[]);
				setCurrencies(currenciesResponse as Currency[]);

				saveUserInfo(loggedInUserData);
				saveSessionInfo(signInResult);
				router.push("/Auth/Main");
			}
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
						action={handleLogin}
						className="bg-white rounded-md shadow-2xl p-5"
					>
						<h1 className="text-gray-800 font-bold text-2xl mb-1">Hola!</h1>
						<p className="text-sm font-normal text-gray-600 mb-8">Bienvenido</p>
						<div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
							<Email />
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
							<Password />
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
