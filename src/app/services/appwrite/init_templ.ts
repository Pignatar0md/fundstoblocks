import { Avatars, Client, Databases, Account, Storage, Teams } from "appwrite";

export const WEB3_CONFIG = {
	INFURA_API_KEY: "",
};

const BACKEND_CONFIG = {
	APPWRITE_ENDPOINT: "https://cloud.appwrite.io/v1",

	PROJECT_ID: "",
	DATABASE_ID: "",
	CURRENCIES_COLLECTION_ID: "",
	WALLETS_COLLECTION_ID: "",
	TRANSACTIONS_COLLECTION_ID: "",
	NETWORKS_COLLECTION_ID: "",
	USERS_COLLECTION_ID: "",
	MANAGED_USERS_COLLECTION_ID: "",
};
const client = new Client();

client
	.setEndpoint(BACKEND_CONFIG.APPWRITE_ENDPOINT)
	.setProject(BACKEND_CONFIG.PROJECT_ID);

const teams = new Teams(client);
const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);
const avatars = new Avatars(client);

const cryptoNetworks = {
	Polygon: "",
	Ethereum: "",
	Avalanche: "",
	BSC: "",
	Arbitrum: "",
};

export {
	teams,
	account,
	databases,
	storage,
	avatars,
	BACKEND_CONFIG,
	cryptoNetworks,
};
