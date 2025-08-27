"use client";
import React, { useContext, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/app/components/Buttons/Button";
import SelectField from "@/app/components/Inputs/SelectField";
import { addWallet, updateWallet } from "@/app/services/supabase/wallets";
import { StoreContext } from "@/state/GlobalProvider";
import { Wallet } from "@/types/Wallet";
import Description from "@/app/components/Icons/description";
import Email from "@/app/components/Icons/email";
import { loggedInUserStorageKeys } from "@/app/services/supabase/init";

export default function WalletDetailsPage() {
	const { store } = useContext(StoreContext);
	const router = useRouter();
	const [errorModal, setErrorModal] = useState({
		show: false,
		text: "",
		title: "",
	});
	const [networkOptions, setNetworkOptions] = useState<
		{ text: string; value: string }[]
	>([]);
	const [stableCoinOptions, setStableCoinOptions] = useState<
		{ text: string; value: string }[]
	>([]);

	const getInitialParams = async () => {
		const userId = await sessionStorage.getItem(loggedInUserStorageKeys.userId);
		const networkFormattedResult = store.networks?.map(
			({ descriptions, name, id }) => ({
				text: `${descriptions} (${name})`,
				value: id,
			})
		);
		const currencyFormattedResult = store.currencies?.map(({ name, id }) => ({
			text: name,
			value: id,
		}));

		setNetworkOptions(
			networkFormattedResult ?? [{ text: "sin redes", value: "0" }]
		);
		setStableCoinOptions(
			currencyFormattedResult ?? [{ text: "sin monedas", value: "0" }]
		);

		if (networkFormattedResult && currencyFormattedResult) {
			setWallet({
				...wallet,
				adminUserId: userId as string,
				networks: networkFormattedResult[0],
				currencies: currencyFormattedResult[0],
			});
		}
		if (walletId) {
			getWalletById();
		}
	};

	const searchParams = useSearchParams();
	const walletId = searchParams.get("id");

	const [wallet, setWallet] = useState({
		address: "",
		description: "",
		currencies: { value: "", text: "" },
		networks: { value: "", text: "" },
		adminUserId: "",
	});

	const getWalletById = () => {
		const [walletToUpdate] = store.wallets.filter(
			(wallet: Wallet) => String(wallet.id) === walletId
		);

		if (walletToUpdate?.id) {
			setWallet({
				...wallet,
				address: walletToUpdate.address,
				description: walletToUpdate.description,
				currencies: {
					text: walletToUpdate.currencies.name,
					value: walletToUpdate.currencies.id,
				},
				networks: {
					text: walletToUpdate.networks.name,
					value: walletToUpdate.networks.id,
				},
			});
		}
	};

	useEffect(() => {
		getInitialParams();
	}, [store.wallets]);

	const saveWallet = async () => {
		let response;
		if (!walletId) {
			response = await addWallet(wallet);
		} else {
			response = await updateWallet(walletId, wallet);
		}
		if (response) {
			router.push("/Auth/Wallets");
		} else {
			setErrorModal({
				show: true,
				text: "aaa",
				title: "asd",
			});
		}
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
						<Description />
						<input
							id="description"
							className=" pl-2 w-full outline-none border-none"
							value={wallet?.description}
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
						<Email />
						<input
							id="address"
							className=" pl-2 w-full outline-none border-none"
							type="text"
							onChange={(e) =>
								setWallet({ ...wallet, address: e.target.value })
							}
							name="walletAddress"
							value={wallet?.address}
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
								return setWallet({
									...wallet,
									currencies: selectedOpt,
								});
							}}
							defaultSelected={wallet?.currencies?.value}
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
							defaultSelected={wallet?.networks?.value}
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
