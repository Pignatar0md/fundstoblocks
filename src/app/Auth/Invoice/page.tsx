"use client";
import { updateTransactionStatus } from "@/app/services/supabase/transactions";
import { addTransaction } from "@/app/services/supabase/transactions";
import { useRouter } from "next/navigation";
import QrGenerator from "@/app/components/QrGenerator";
import { StoreContext } from "@/state/GlobalProvider";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { loggedInUserStorageKeys } from "@/app/services/supabase/init";

const CHARGE_COIN = "$";

export default function InvoicePage() {
	const { store } = useContext(StoreContext);
	const searchParams = useSearchParams();
	const router = useRouter();
	const amount = searchParams.get("amount");
	const walletId = searchParams.get("walletId");
	const [transactionId, setTransactionId] = useState("");
	const [adminUserId, setAdminUserId] = useState("");
	const [internalWalletAddr, setInternalWalletAddr] = useState("");
	const [walletInfo, setWalletInfo] = useState({
		description: "",
		networks: { name: "", descriptions: "" },
	});

	const getInitialParams = async () => {
		const userId = await sessionStorage.getItem(loggedInUserStorageKeys.userId);
		const internalEthAddr = await sessionStorage.getItem(
			loggedInUserStorageKeys.walletAddress
		);
		userId && setAdminUserId(userId);
		internalEthAddr && setInternalWalletAddr(internalEthAddr);
	};

	useEffect(() => {
		getInitialParams();
		const [receivingWallet] = store.wallets.filter(
			(wallet) => String(wallet.id) === walletId
		);
		setWalletInfo(receivingWallet);
	}, [walletId, store.wallets]);

	const updatePayment = async () => {
		const confirmationBeganAt = new Date().toISOString();
		const txStatus = {
			status: true,
			confirmationAt: confirmationBeganAt,
		};
		const response = await updateTransactionStatus(transactionId, txStatus);
		if (response.data && response.data[0].id) {
			router.push("/Auth/Main");
		}
	};

	const addPayment = async () => {
		const validationBeganAt = new Date().toISOString();
		const transaction = {
			from: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
			status: false,
			validatingAt: validationBeganAt,
			amount: parseFloat(amount || "0"),
			walletId: Number(walletId),
			adminUserId: Number(adminUserId),
		};
		const response = await addTransaction(transaction);
		if (response && response.length > 0) {
			const { id } = response[0];
			setTransactionId(id);
		}
	};

	return (
		<div className="flex lg:w-1/2 justify-center items-center space-y-8">
			<div className="w-full px-8 md:px-32 lg:px-24">
				<div className="bg-white rounded-md shadow-2xl p-5">
					<form>
						<h1 className="text-gray-800 text-center font-bold text-2xl mb-1">
							Escanea para pagar
						</h1>
						<div className="flex items-center justify-center mb-8 py-2">
							<QrGenerator info={amount + "/" + internalWalletAddr} />
						</div>
						<div className="flex items-center justify-center mb-8">
							<h3 className="text-gray-800 text-center text-2xl mb-1">
								Billetera <b>{walletInfo?.description}</b> recibe{" "}
								<b>
									{CHARGE_COIN}
									{amount}
								</b>{" "}
								a través de la red <b>{walletInfo?.networks?.name}</b> (
								{walletInfo?.networks?.descriptions})
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
						{/* <Button text={"Generar Transacción"} type="submit" /> */}
						{/* <Button text={"Actualizar Transacción"} type="submit" /> */}
					</form>
				</div>
			</div>
		</div>
	);
}
