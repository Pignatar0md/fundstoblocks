export type Wallet = {
	description: string;
	address: string;
	networks: { name: string; $id: string };
	currencies: { name: string; $id: string };
	$id: string;
};
