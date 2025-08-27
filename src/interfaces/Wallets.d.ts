export interface NewWallet {
	description: string;
	address: string;
	currencies: { value: string };
	networks: { value: string };
	adminUserId: string;
}
