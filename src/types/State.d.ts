export type StoreInitState = {
	wallets: Wallet[];
	transactions: Transaction[];
	users: User[];
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
