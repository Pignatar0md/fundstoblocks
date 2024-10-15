export type Transaction = {
	$id?: tring;
	from: tring;
	amount: tring;
	status: tring;
	validatingAt: tring;
	wallets: { description?: string; $id: string };
	confirmationAt: tring;
};

export type UpdatedTransaction = {
	$id?: tring;
	status: tring;
	confirmationAt: tring;
};
