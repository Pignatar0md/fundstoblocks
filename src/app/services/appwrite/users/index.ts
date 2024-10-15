import { ID, Query } from "appwrite";
import { account, avatars, databases, BACKEND_CONFIG } from "../init";
import { User, UserLogin } from "@/types/User";

export const createAdminUser = async ({
	name,
	password,
	email,
	phone,
}: User) => {
	try {
		const newAccount = await account.create(ID.unique(), email, password, name);
		const avatarUrl = avatars.getInitials(name);

		await createUserSession({ email, password });

		const newUser = await databases.createDocument(
			BACKEND_CONFIG.DATABASE_ID,
			BACKEND_CONFIG.USERS_COLLECTION_ID,
			ID.unique(),
			{ accountId: newAccount.$id, email, name, avatar: avatarUrl, phone }
		);
		return newUser;
	} catch (error: unknown) {
		if (error instanceof Error) {
			throw Error(error.message);
		}
	}
};

const createUserSession = async ({ email, password }: UserLogin) => {
	const session = await account.createEmailPasswordSession(email!, password);
	return session;
};

export const getCurrentUser = async () => {
	try {
		const currentAccount = await account.get();
		if (!currentAccount) {
			throw Error;
		}
		const currentUser = await databases.listDocuments(
			BACKEND_CONFIG.DATABASE_ID,
			BACKEND_CONFIG.USERS_COLLECTION_ID,
			[Query.equal("accountId", currentAccount.$id)]
		);
		return currentUser.documents[0];
	} catch (error: any) {
		return error;
	}
};

export const signOut = async () => {
	try {
		const response = await account.deleteSession("current");
		return response;
	} catch (error: any) {
		throw new Error(error);
	}
};

export const signIn = async ({ password, email }: UserLogin) => {
	try {
		const session = await createUserSession({ email, password });
		return session;
	} catch (error: any) {
		throw Error(error);
	}
};

export const getUsers = async () => {
	try {
		const response = await databases.listDocuments(
			BACKEND_CONFIG.DATABASE_ID,
			BACKEND_CONFIG.USERS_COLLECTION_ID,
			[Query.orderDesc("$createdAt")]
		);
		return response.documents as unknown as User[];
	} catch (error: any) {
		throw new Error(error);
	}
};
// export const getUser = async () => {};

export const quitUser = async () => {
	try {
		const response = await databases.deleteDocument(
			BACKEND_CONFIG.DATABASE_ID,
			BACKEND_CONFIG.WALLETS_COLLECTION_ID,
			id
		);
		return response;
	} catch (error: any) {
		throw new Error(error);
	}
};

export const addUser = async ({ name, email, password, phone }: User) => {
	try {
		const newAccount = await account.create(ID.unique(), email, password, name);
		const avatarUrl = avatars.getInitials(name);
		const response = await databases.createDocument(
			BACKEND_CONFIG.DATABASE_ID,
			BACKEND_CONFIG.USERS_COLLECTION_ID,
			ID.unique(),
			{
				name,
				email,
			}
		);
		const newUser = await databases.createDocument(
			BACKEND_CONFIG.DATABASE_ID,
			BACKEND_CONFIG.USERS_COLLECTION_ID,
			ID.unique(),
			{ accountId: newAccount.$id, email, name, avatar: avatarUrl, phone }
		);
		return newUser;
	} catch (error: any) {
		throw new Error(error);
	}
};

export const updateUser = async (user: User, userId: string) => {
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
