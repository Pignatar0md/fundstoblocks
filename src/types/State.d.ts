export type StoreInitState = {
	wallets: Wallet[];
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
