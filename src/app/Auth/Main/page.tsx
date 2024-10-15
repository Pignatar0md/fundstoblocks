"use client";
import { useContext, useEffect, useState } from "react";
import PaginatedList from "@/app/components/PaginatedList";
import SearchField from "@/app/components/Inputs/SearchField";
import { StoreContext } from "@/state/GlobalProvider";
import { getTransactionsList } from "@/app/services/appwrite/transactions";
import { Transaction } from "@/types/Transaction";

export default function MainPage() {
	const [searchValue, setSearchValue] = useState("");

	const { store, setTransactions } = useContext(StoreContext);

	useEffect(() => {
		const getTransactions = async () => {
			const response = await getTransactionsList();
			setTransactions(response as Transaction[]);
		};
		getTransactions();
	}, []);

	const runSearch = () => {
		return [];
	};

	return (
		<div className="flex lg:w-full justify-center items-center space-y-8">
			<div className="w-full px-8 md:px-32 lg:px-24">
				<div className="bg-white rounded-md shadow-2xl p-5">
					<h1 className="text-gray-800 text-center font-bold text-2xl mb-1">
						Lista de Transacciones
					</h1>
					<div className="px-4 sm:px-8 max-w-5xl">
						<SearchField
							runSearch={runSearch}
							value={searchValue}
							setValue={(e) => setSearchValue(e.target.value)}
						/>
					</div>
					<PaginatedList
						listType="transactions"
						rows={store.transactions}
						heads={[
							"#",
							"De",
							"Importe",
							"Estado",
							"Fecha",
							"Hora Inicio",
							"Billetera",
							"Hora Validación",
						]}
					/>
				</div>
			</div>
		</div>
	);
}
