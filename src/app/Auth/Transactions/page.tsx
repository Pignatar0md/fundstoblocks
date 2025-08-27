import { useContext, useEffect, useState } from "react";
import PaginatedList from "@/app/components/PaginatedList";
import SearchField from "@/app/components/Inputs/SearchField";
import { StoreContext } from "@/state/GlobalProvider";
import { Transaction } from "@/types/Transaction";
import {
	subscribeToTransactions,
	// unsubscribeToTransactions,
} from "@/app/helpers/subscriptions/transactions";
import { getTransactionsList } from "@/app/services/supabase/transactions";

export default function TransactionsPage() {
	const [searchValue, setSearchValue] = useState("");

	const { store, setTransactions } = useContext(StoreContext);

	const getTransactions = async () => {
		const response = await getTransactionsList();
		setTransactions(response as Transaction[]);
	};

	const channel = subscribeToTransactions(getTransactions);

	useEffect(() => {
		getTransactions();
		// return () => unsubscribeToTransactions(channel);
	}, []);

	const runSearch = () => {
		return [];
	};

	return (
		<div className="w-full px-8 md:px-32 lg:px-24">
			{store.transactions.length > 1 ? (
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
							"De",
							"Importe",
							"Estado",
							"Fecha",
							"Inicio",
							"Billetera",
							"Confirmación",
							"Acciones",
						]}
					/>
				</div>
			) : (
				<span>Sin transacciones todavía.</span>
			)}
		</div>
	);
}
