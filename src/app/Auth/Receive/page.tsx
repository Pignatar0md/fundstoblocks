"use client";
import { useContext, useEffect, useState } from "react";
import { redirect } from "next/navigation";

import Button from "@/app/components/Buttons/Button";
import SelectField from "@/app/components/Inputs/SelectField";
import { StoreContext } from "@/state/GlobalProvider";
import Money from "@/app/components/Icons/money";

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
						<Money />
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
