"use client";
// import Button from "@/app/components/Buttons/Button";
// import { addTransaction, updateTransaction } from "@/app/services/appwrite/transactions";
// import { useRouter } from "next/navigation";
import QrGenerator from "@/app/components/QrGenerator";
import { StoreContext } from "@/state/GlobalProvider";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const CHARGE_COIN = "$";

export default function InvoicePage() {
	const { store } = useContext(StoreContext);
	const searchParams = useSearchParams();
	const amount = searchParams.get("amount");
	const walletId = searchParams.get("walletId");
	const [walletInfo, setWalletInfo] = useState({
		description: "",
		networks: { name: "", description: "" },
	});

	useEffect(() => {
		const receivingWallet = store.wallets.filter(
			(wallet) => wallet.$id === walletId
		);
		setWalletInfo(receivingWallet[0]);
	}, []);
	// const updatePayment = async () => {
	// 	const response = await updateTransaction({
	// 		$id: "670ce96f00115c4da6b6",
	// 		status: "confirmed",
	// 		confirmationAt: "2024-10-14T11:34:21.231+00:00",
	// 	});
	// 	debugger;
	// };
	// const addPayment = async () => {
	// 	const transaction = {
	// 		amount: "3.45",
	// 		wallets: { $id: "67080dda00107bbdf693" },
	// 		from: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
	// 		status: "validating",
	// 		confirmationAt: "",
	// 		validatingAt: "2024-10-12T20:57:32.101+00:00",
	// 	};
	// 	debugger;
	// 	const response = await addTransaction(transaction);
	// 	if (response.$id) {
	// 		router.push("/Auth/Main");
	// 	}

	return (
		<div className="flex lg:w-1/2 justify-center items-center space-y-8">
			<div className="w-full px-8 md:px-32 lg:px-24">
				<div className="bg-white rounded-md shadow-2xl p-5">
					<form
						action={() => {}}
						// action={updatePayment}
						// action={addPayment}
					>
						<h1 className="text-gray-800 text-center font-bold text-2xl mb-1">
							Escanea para pagar
						</h1>
						<div className="flex items-center justify-center mb-8 py-2">
							<QrGenerator info={amount + "/" + walletId} />
						</div>
						<div className="flex items-center justify-center mb-8">
							<h3 className="text-gray-800 text-center text-2xl mb-1">
								Billetera <b>{walletInfo.description}</b> recibe{" "}
								<b>
									{CHARGE_COIN}
									{amount}
								</b>{" "}
								a través de la red <b>{walletInfo.networks.name}</b> (
								{walletInfo.networks.description})
							</h3>
						</div>
						<div className="flex justify-center">
							<Link
								className="block text-center w-52 bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
								href="/Auth/Receive"
							>
								Cancelar
							</Link>
						</div>
						{/* <Button text={"Generamos manualmente"} type="submit" /> */}
						{/* <Button text={"Actualizamos manualmente"} type="submit" /> */}
					</form>
				</div>
			</div>
		</div>
	);
}
