import { Query } from "appwrite";
import { databases, BACKEND_CONFIG } from "./init";

export const getCurrencies = async () => {
	try {
		const response = await databases.listDocuments(
			BACKEND_CONFIG.DATABASE_ID,
			BACKEND_CONFIG.CURRENCIES_COLLECTION_ID,
			[Query.orderDesc("$createdAt")]
		);
		return response.documents;
	} catch (error: any) {
		throw new Error(error);
	}
};

export const getNetworks = async () => {
	try {
		const response = await databases.listDocuments(
			BACKEND_CONFIG.DATABASE_ID,
			BACKEND_CONFIG.NETWORKS_COLLECTION_ID,
			[Query.orderDesc("$createdAt")]
		);
		return response.documents;
	} catch (error: any) {
		throw new Error(error);
	}
};
