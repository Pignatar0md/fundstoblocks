import { ID, Query } from "appwrite";
import { EditedWallet, NewWallet } from "@/interfaces/Wallets";
import { BACKEND_CONFIG, databases } from "../init";

export const getWallets = async () => {
	try {
		const response = await databases.listDocuments(
			BACKEND_CONFIG.DATABASE_ID,
			BACKEND_CONFIG.WALLETS_COLLECTION_ID,
			[Query.orderDesc("$createdAt")]
		);
		return response;
	} catch (error: any) {
		throw new Error(error);
	}
};
// export const getWallet = async (id: string) => {
// };

export const quitWallet = async (id: string) => {
	try {
		const response = await databases.deleteDocument(
			BACKEND_CONFIG.DATABASE_ID,
			BACKEND_CONFIG.WALLETS_COLLECTION_ID,
			id
		);
		return response;
	} catch (error: any) {
		return error.message;
	}
};

export const addWallet = async ({
	description,
	address,
	currencies,
	networks,
}: NewWallet) => {
	try {
		const response = await databases.createDocument(
			BACKEND_CONFIG.DATABASE_ID,
			BACKEND_CONFIG.WALLETS_COLLECTION_ID,
			ID.unique(),
			{
				description,
				address,
				currencies,
				networks,
			}
		);
		return response;
	} catch (error: any) {
		throw new Error(error);
	}
};

export const updateWallet = async ({
	// PROBAR UPDATE
	$id,
	description,
	address,
	currencies,
	networks,
}: EditedWallet) => {
	try {
		const response = await databases.updateDocument(
			BACKEND_CONFIG.DATABASE_ID,
			BACKEND_CONFIG.WALLETS_COLLECTION_ID,
			$id,
			{
				description,
				address,
				currencies,
				networks,
			}
		);
		return response;
	} catch (error: any) {
		throw new Error(error);
	}
};
