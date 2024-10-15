export type User = {
	accountId?: string;
	name?: string;
	email: string;
	avatar?: string;
	phone?: string;
	password: string;
};

export type UserLogin = { password: string; email: string };
