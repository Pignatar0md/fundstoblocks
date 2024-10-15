import { ID, Query } from "appwrite";
import { Transaction, UpdatedTransaction } from "@/types/Transaction";
import { databases, BACKEND_CONFIG } from "../init";

export const getTransactionsList = async (): Promise<Transaction[]> => {
	try {
		const response = await databases.listDocuments(
			BACKEND_CONFIG.DATABASE_ID,
			BACKEND_CONFIG.TRANSACTIONS_COLLECTION_ID,
			[Query.orderDesc("$createdAt")]
		);
		return response.documents as unknown as Transaction[];
	} catch (error: any) {
		throw new Error(error);
	}
};
// export const getTransaction = async () => {}

export const updateTransaction = async ({
	$id,
	status,
	confirmationAt,
}: UpdatedTransaction) => {
	try {
		const response = await databases.updateDocument(
			BACKEND_CONFIG.DATABASE_ID,
			BACKEND_CONFIG.TRANSACTIONS_COLLECTION_ID,
			$id,
			{
				status,
				confirmationAt,
			}
		);
		return response;
	} catch (error: any) {
		throw new Error(error);
	}
};

export const addTransaction = async ({
	from,
	amount,
	status,
	validatingAt,
	confirmationAt,
	wallets,
}: Transaction) => {
	try {
		const { $id } = wallets;
		const response = await databases.createDocument(
			BACKEND_CONFIG.DATABASE_ID,
			BACKEND_CONFIG.TRANSACTIONS_COLLECTION_ID,
			ID.unique(),
			{
				from,
				amount: Number(amount),
				status,
				validatingAt,
				confirmationAt,
				wallets: $id,
			}
		);
		debugger;
		return response;
	} catch (error: any) {
		throw new Error(error);
	}
};
