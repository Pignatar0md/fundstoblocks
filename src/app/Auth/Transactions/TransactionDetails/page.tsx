"use client";
import Button from "@/app/components/Buttons/Button";
import Confirmed from "@/app/components/Icons/confirmed";
import Validating from "@/app/components/Icons/validating";
import { getTransaction } from "@/app/services/supabase/transactions";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function TransactionDetailsPage() {
	const [transaction, setTransaction] = useState({
		from: "",
		status: false,
		created_at: "",
		confirmationAt: "",
		validatingAt: "",
		amount: "",
		wallets: {
			description: "",
			address: "",
			networks: { name: "" },
			currencies: { name: "" },
		},
	});
	const searchParams = useSearchParams();
	const transactionId = searchParams.get("id");

	const fetchTransactionById = async () => {
		if (transactionId) {
			const response = await getTransaction(transactionId);
			if (response) setTransaction(response[0]);
		}
	};

	useEffect(() => {
		transactionId && fetchTransactionById();
	}, [transactionId]);

	return (
		<div className="w-full px-8 md:px-32 lg:px-24 py-12">
			<div className="bg-white rounded-md shadow-2xl p-5">
				<div className="w-full px-8 md:px-32 lg:px-24">
					<div className="p-5">
						<div className="mt-2">
							<div className="flex flex-col md:flex-row border-b border-gray-200 pb-4 mb-4">
								<div className="w-64 font-bold h-6 mx-2 mt-3 text-gray-800">
									Origen e importe
								</div>
								<div className="flex-1 flex flex-col md:flex-row">
									<div className=" mx-2">
										<div className="my-2 p-1 bg-white flex">
											<span>
												<strong>Desde</strong> <i>{transaction.from}</i>
											</span>
										</div>
									</div>
									<div className=" mx-2">
										<div className="my-2 p-1 bg-white flex">
											{/* <input
												placeholder="amount"
												disabled
												value={" Importe ($) " + transaction.amount}
												className="p-1 px-2 appearance-none outline-none w-full text-gray-800 "
											/> */}
											<span>
												<strong>Importe ($)</strong> <i>{transaction.amount}</i>
											</span>
										</div>
									</div>
								</div>
							</div>
							<div className="flex flex-col md:flex-row pb-4 mb-4">
								<div className="w-64 font-bold h-6 mx-2 mt-3 text-gray-800">
									Billetera
								</div>
								<div className="flex-1 flex flex-col md:flex-row">
									<div className="w-full flex-1 mx-1">
										<div className="my-2 p-1 bg-white flex">
											<input
												placeholder="currency"
												disabled
												value={transaction.wallets.currencies.name}
												className="p-1 px-2 appearance-none outline-none w-full text-gray-800 "
											/>{" "}
										</div>
									</div>
									<div className="w-full flex-1 mx-1">
										<div className="my-2 p-1 bg-white flex">
											<input
												placeholder="network"
												disabled
												value={transaction.wallets.networks.name}
												className="p-1 px-2 appearance-none outline-none w-full text-gray-800 "
											/>{" "}
										</div>
									</div>
								</div>
							</div>
							<div className="flex flex-col md:flex-row pb-4 mb-4">
								<div className="w-64 font-bold h-6 mx-2 mt-3 text-gray-800"></div>
								<div className="flex-1 flex flex-col md:flex-row">
									<div className="w-full flex-1 mx-1">
										<div className="my-2 p-1 bg-white flex border border-gray-200 rounded">
											<input
												placeholder="receiving wallet"
												disabled
												value={transaction.wallets.address}
												className="p-1 px-2 appearance-none outline-none w-full text-gray-800 "
											/>{" "}
										</div>
									</div>
								</div>
							</div>
							<div className="flex flex-col border-b md:flex-row pb-4 mb-4">
								<div className="w-64 font-bold h-6 mx-2 mt-3 text-gray-800"></div>
								<div className="flex-1 flex flex-col md:flex-row">
									<div className="w-full flex-1 mx-1">
										<div className="my-2 p-1 bg-white flex border border-gray-200 rounded">
											<input
												placeholder="a"
												value={"Revolut Dueño 2"}
												disabled
												className="p-1 px-2 appearance-none outline-none w-full text-gray-800 "
											/>{" "}
										</div>
									</div>
								</div>
							</div>
							<div className="flex flex-col md:flex-row pb-4 mb-4">
								<div className="w-64 font-bold h-6 mx-2 mt-3 text-gray-800">
									Estado
								</div>
								<div className="flex-1 flex flex-col md:flex-row">
									<div className="w-full flex-1 mx-1">
										<div className="my-2 p-2 bg-white flex rounded">
											{transaction.status ? (
												<>
													<Confirmed />
													&nbsp; &nbsp;Confirmada
												</>
											) : (
												<>
													<Validating />
													&nbsp; &nbsp;En Validación
												</>
											)}
										</div>
									</div>
									<div className="w-full flex-1 mx-1">
										<div className="my-2 p-1 bg-white flex border border-gray-200 rounded">
											<input
												placeholder="date"
												disabled
												value={transaction.created_at}
												className="p-1 px-2 appearance-none outline-none w-full text-gray-800 "
											/>{" "}
										</div>
									</div>
								</div>
							</div>
							<div className="flex flex-col md:flex-row pb-4 mb-4">
								<div className="w-64 font-bold h-6 mx-2 mt-3 text-gray-800"></div>
								<div className="flex-1 flex flex-col md:flex-row">
									<div className="w-full flex-1 mx-1">
										<div className="my-2 p-1 bg-white flex border border-gray-200 rounded">
											<input
												placeholder="Hora validación"
												disabled
												value={transaction.validatingAt}
												className="p-1 px-2 appearance-none outline-none w-full text-gray-800 "
											/>{" "}
										</div>
									</div>
									<div className="w-full flex-1 mx-1">
										<div className="my-2 p-1 bg-white flex border border-gray-200 rounded">
											<input
												placeholder="Hora confirmación"
												disabled
												value={transaction.confirmationAt || ""}
												className="p-1 px-2 appearance-none outline-none w-full text-gray-800 "
											/>{" "}
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="flex flex-col md:flex-row">
							<div className="w-64 mx-2 font-bold h-6 mt-3 text-gray-800"></div>
							<div className="flex-1 flex flex-col md:flex-row">
								<Button type="submit" text="Atrás" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
