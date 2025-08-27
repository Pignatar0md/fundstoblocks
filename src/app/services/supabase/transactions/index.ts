import { Transaction } from "@/types/Transaction";
import { supabase } from "../../../../../lib/supabase";

export const addTransaction = async ({
	from,
	amount,
	status,
	validatingAt,
	confirmationAt,
	walletId,
	adminUserId,
}: Transaction) => {
	try {
		const response = await supabase
			.from("transactions")
			.insert({
				from,
				status,
				validatingAt,
				confirmationAt,
				amount,
				fk_wallet: walletId,
				fk_user: adminUserId,
			})
			.select();
		if (response.data) return response.data;
	} catch (error) {
		throw error;
	}
};

export const updateTransactionStatus = async (
	txId: string,
	txStatus: {
		status: boolean;
		confirmationAt: string;
	}
) => {
	try {
		const response = await supabase
			.from("transactions")
			.update({
				status: txStatus.status,
				confirmationAt: txStatus.confirmationAt,
			})
			.eq("id", txId)
			.select();
		return response;
	} catch (error) {
		throw error;
	}
};

export const getTransactionsList = async () => {
	try {
		const { data } = await supabase
			.from("transactions")
			.select(
				"id, from, amount, status, validatingAt, confirmationAt, wallets (description)"
			);
		if (data) return data;
	} catch (error) {
		throw error;
	}
};

export const getTransaction = async (id: string) => {
	try {
		const response = await supabase
			.from("transactions")
			.select(
				"from, status, created_at, confirmationAt, validatingAt, amount, wallets (description, address, networks(name), currencies (name))"
			)
			.eq("id", id);
		if (response) return response.data;
	} catch (error) {
		debugger;
		throw error;
	}
};
