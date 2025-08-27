export type ListedTransaction = {
	id: string;
	from: string;
	amount: string;
	status: boolean;
	validatingAt: string;
	wallets: { description: string };
	confirmationAt: string;
};

export type Transaction = {
	id?: string;
	from?: string;
	amount?: number;
	status: boolean;
	validatingAt?: string;
	confirmationAt?: string;
	walletId?: number;
	adminUserId?: number;
};

export type TransactionDetails = {
	from: string;
	status: boolean;
	created_at: string;
	confirmationAt: string;
	validatingAt: string;
	amount: string;
	wallets: {
		description: string;
		address: string;
		networks: { name: string };
		currencies: { name: string };
	};
};

export type UpdatedTransaction = {
	id: string;
	status: boolean;
	confirmationAt: string;
};
