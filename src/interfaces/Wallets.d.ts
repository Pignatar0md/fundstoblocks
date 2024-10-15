export interface NewWallet {
	description: string;
	address: string;
	currencies: string;
	networks: string;
}

export interface EditedWallet extends NewWallet {
	$id: string;
}
