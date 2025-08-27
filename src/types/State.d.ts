export type StoreInitState = {
	wallets: Wallet[];
	networks: Network[];
	currencies: Currency[];
	transactions: Transaction[];
	users: User[];
	managedUsers: ManagedUser[];
};

export type ActionType = {
	type: string;
	payload?:
		| string
		| object
		| boolean
		| []
		| { label: string; value: number }[]
		| number;
};
