import { ID, Query } from "appwrite";
import { account, avatars, databases, BACKEND_CONFIG } from "../init";
import { ManagedUser } from "@/types/User";

export const getManagedUsers = async () => {
	// READ
	try {
		const response = await databases.listDocuments(
			BACKEND_CONFIG.DATABASE_ID,
			BACKEND_CONFIG.MANAGED_USERS_COLLECTION_ID,
			[Query.orderDesc("$createdAt")]
		);
		return response.documents as unknown as ManagedUser[];
	} catch (error) {
		throw error;
	}
};

export const addManagedUser = async ({
	name,
	email,
	password,
	phone,
	users,
}: ManagedUser) => {
	// CREATE
	try {
		const newAccount = await account.create(ID.unique(), email, password, name);
		const avatarUrl = avatars.getInitials(name);

		const newManagedUser = await databases.createDocument(
			BACKEND_CONFIG.DATABASE_ID,
			BACKEND_CONFIG.MANAGED_USERS_COLLECTION_ID,
			ID.unique(),
			{
				accountId: newAccount.$id,
				email,
				name,
				avatar: avatarUrl,
				phone,
				users,
			}
		);
		return newManagedUser;
	} catch (error) {
		throw error;
	}
};

export const quitManagedUser = async (id: string) => {
	// DELETE
	try {
		await account.updatePassword("z0b8v6x74j", "111111111");
		debugger;
		const response = await databases.deleteDocument(
			BACKEND_CONFIG.DATABASE_ID,
			BACKEND_CONFIG.MANAGED_USERS_COLLECTION_ID,
			id
		);
		return response;
	} catch (error) {
		throw error;
	}
};

// export const updateManagedUser = async (user: ManagedUser, userId: string) => {
// 	// UPDATE
// 	try {
// 		const response = await databases.updateDocument(
// 			BACKEND_CONFIG.DATABASE_ID,
// 			BACKEND_CONFIG.MANAGED_USERS_COLLECTION_ID,
// 			userId,
// 			user
// 		);
// 		return response;
// 	} catch (error) {
// 		throw error;
// 	}
// };

// export const getManagedUser = async (id: string) => {
// 	// READ
// 	try {
// 		const response = await databases.listDocuments(
// 			BACKEND_CONFIG.DATABASE_ID,
// 			BACKEND_CONFIG.MANAGED_USERS_COLLECTION_ID,
//       id
// 		);
// 		return response.documents as unknown as ManagedUser;
// 	} catch (error: any) {
// 		throw new Error(error);
// 	}
// };
