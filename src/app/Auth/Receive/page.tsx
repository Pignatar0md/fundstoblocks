"use client";
import { useContext, useEffect, useState } from "react";
import { redirect } from "next/navigation";

import Button from "@/app/components/Buttons/Button";
import SelectField from "@/app/components/Inputs/SelectField";
import { StoreContext } from "@/state/GlobalProvider";

export default function ReceivePage() {
	const { store } = useContext(StoreContext);
	const [walletOptions, setWalletOptions] = useState([{ value: "", text: "" }]);
	const [wallet, setWallet] = useState({ value: "", text: "" });
	const [amount, setAmount] = useState("");

	const getWalletOptions = () => {
		const formattedWallets = store.wallets.map((wallet) => ({
			text: wallet.description,
			value: wallet.$id,
		}));
		setWalletOptions(formattedWallets);
		setWallet(formattedWallets[0]);
	};

	useEffect(() => {
		getWalletOptions();
	}, []);

	const createQRCode = () => {
		redirect(`/Auth/Invoice?amount=${amount}&walletId=${wallet.value}`);
	};

	return (
		<div className="flex lg:w-1/2 justify-center items-center space-y-8">
			<div className="w-full px-8 md:px-32 lg:px-24">
				<form
					action={createQRCode}
					className="bg-white rounded-md shadow-2xl p-5"
				>
					<h1 className="text-gray-800 text-center font-bold text-2xl mb-5">
						Crea un Cobro
					</h1>
					<div>
						<label>Importe a recibir</label>
					</div>
					<div className="flex items-center border-2 mb-3 px-3 rounded-2xl ">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="h-5 w-5 text-gray-400"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
							/>
						</svg>
						<input
							className="pl-2 w-full outline-none border-none"
							type="text"
							value={amount}
							onChange={({ target }) => setAmount(target.value)}
							name="amount"
							id="amount"
							placeholder="Ej: 3.25"
						/>
					</div>
					<div className="items-center mb-8 py-2 rounded-2xl ">
						<SelectField
							handleChange={({ target }) =>
								setWallet({
									value: target.value,
									text: target.options[target.selectedIndex].text,
								})
							}
							bordered
							defaultSelected={wallet.value}
							options={walletOptions}
							selectName="wallet"
							label="Seleccionar billetera"
						/>
					</div>
					<Button text={"Crear QR de Pago"} type="submit" />
				</form>
			</div>
		</div>
	);
}
