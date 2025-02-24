export type User = {
	accountId?: string;
	name?: string;
	email: string;
	avatar?: string;
	phone?: string;
	password: string;
	ethAddr: string;
	ethPrivateKey: string;
};

export type UserLogin = { password: string; email: string };

export type ManagedUser = {
	$id: string;
	name?: string;
	email: string;
	avatar?: string;
	phone?: string;
	password: string;
	users: string;
};
