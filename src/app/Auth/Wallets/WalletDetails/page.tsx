"use client";
import React, { useContext, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/app/components/Buttons/Button";
import SelectField from "@/app/components/Inputs/SelectField";
import { addWallet, updateWallet } from "@/app/services/appwrite/wallets";
import { getCurrencies, getNetworks } from "@/app/services/appwrite/api";
// import { getNetworkOptions } from "@/app/helpers/functions";
import { StoreContext } from "@/state/GlobalProvider";
import { Wallet } from "@/types/Wallet";

export default function WalletDetailsPage() {
	const router = useRouter();
	const [networkOptions, setNetworkOptions] = useState<
		{ text: string; value: string }[]
	>([]);
	const [stableCoinOptions, setStableCoinOptions] = useState<
		{ text: string; value: string }[]
	>([]);

	const getPaymentNetworks = async () => {
		const result = await getNetworks();
		const formattedResult = result.map(({ description, $id }) => ({
			text: description,
			value: $id,
		}));
		setNetworkOptions(formattedResult);
	};

	const getStableCoins = async () => {
		const result = await getCurrencies();
		const formattedResult = result.map(({ name, $id }) => ({
			text: name,
			value: $id,
		}));
		setStableCoinOptions(formattedResult);
	};

	const searchParams = useSearchParams();
	const walletId = searchParams.get("id");

	const [wallet, setWallet] = useState({
		address: "",
		description: "",
		currencies: { value: "", text: "" },
		networks: { value: "", text: "" },
	});
	// const [network, setNetwork] = useState(getNetworkOptions(token.value));
	const { store } = useContext(StoreContext);

	const getWalletById = () => {
		const walletToUpdate = store.wallets.filter(
			(wallet: Wallet) => wallet.$id === walletId
		);
		setWallet({
			address: walletToUpdate[0].address,
			description: walletToUpdate[0].description,
			currencies: {
				text: walletToUpdate[0].currencies.name,
				value: walletToUpdate[0].currencies.$id,
			},
			networks: {
				text: walletToUpdate[0].networks.name,
				value: walletToUpdate[0].networks.$id,
			},
		});
	};

	useEffect(() => {
		getStableCoins();
		getPaymentNetworks();
		if (walletId) {
			getWalletById();
		}
	}, []);

	const saveWallet = async () => {
		const response = (await walletId)
			? updateWallet(wallet)
			: addWallet(wallet);

		// if (response.$id) {
		router.push("/Auth/Wallets");
		// }
	};

	return (
		<div className="flex lg:w-1/2 justify-center items-center space-y-8">
			<div className="w-full px-8 md:px-32 lg:px-24">
				<div className="bg-white rounded-md shadow-2xl p-5">
					{" "}
					<h1 className="text-gray-800 text-center font-bold text-2xl mb-3">
						{!walletId ? "Nueva billetera" : "Editar Billetera"}
					</h1>
					<div className="mb-2">
						<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
							Descripción
						</label>
					</div>
					<div className="flex items-center border-2 mb-5 px-3 rounded-2xl">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5 text-gray-400"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
							/>
						</svg>
						<input
							id="description"
							className=" pl-2 w-full outline-none border-none"
							value={wallet.description}
							type="text"
							onChange={(e) =>
								setWallet({ ...wallet, description: e.target.value })
							}
							name="description"
							placeholder="ej: Fondo común"
						/>
					</div>
					<div className="mb-2">
						<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
							Address de billetera
						</label>
					</div>
					<div className="flex items-center border-2 mb-4 px-3 rounded-2xl">
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
							id="address"
							className=" pl-2 w-full outline-none border-none"
							type="text"
							onChange={(e) =>
								setWallet({ ...wallet, address: e.target.value })
							}
							name="walletAddress"
							value={wallet.address}
							placeholder="0x9702...."
						/>
					</div>
					<div className="items-center mb-3 py-2 rounded-2xl ">
						<SelectField
							selectName="currency"
							bordered
							handleChange={({ target }) => {
								const selectedOpt = {
									value: target.value,
									text: target.options[target.selectedIndex].text,
								};
								debugger;
								return setWallet({
									...wallet,
									currencies: selectedOpt,
								});
							}}
							defaultSelected={wallet.currencies.value}
							options={stableCoinOptions}
							label="Elegir moneda"
						/>
					</div>
					<div className="items-center mb-3 py-2 rounded-2xl ">
						<SelectField
							bordered
							selectName="network"
							handleChange={({ target }) =>
								setWallet({
									...wallet,
									networks: {
										value: target.value,
										text: target.options[target.selectedIndex].text,
									},
								})
							}
							defaultSelected={wallet.networks.value}
							options={networkOptions}
							label="Elegir red"
						/>
					</div>
					<div className="items-center mb-8 py-2 rounded-2xl "></div>
					<Button
						text={!walletId ? "Agregar" : "Actualizar"}
						type="button"
						onPress={() => saveWallet()}
					/>
				</div>
			</div>
		</div>
	);
}
