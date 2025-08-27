import { NewWallet } from "@/interfaces/Wallets";
import { supabase } from "../../../../../lib/supabase";

export const addWallet = async ({
	description,
	address,
	currencies,
	networks,
	adminUserId,
}: NewWallet) => {
	try {
		const response = await supabase.from("wallets").insert({
			description,
			address,
			fk_network: networks.value,
			fk_currency: currencies.value,
			fk_user: adminUserId,
		});
		if (!response.error) return response;
	} catch (error) {
		throw error;
	}
};

export const updateWallet = async (
	id: string,
	{
		// UPDATE
		description,
		address,
		currencies,
		networks,
	}: NewWallet
) => {
	try {
		const response = await supabase
			.from("wallets")
			.update({
				description,
				address,
				fk_currency: currencies.value,
				fk_network: networks.value,
			})
			.eq("id", id)
			.select();
		return response;
	} catch (error) {
		throw error;
	}
};

export const quitWallet = async (id: string) => {
	try {
		const response = await supabase
			.from("wallets")
			.update({
				active: false,
			})
			.eq("id", id)
			.select();
		return response;
	} catch (error) {
		throw error;
	}
};

export const getWallets = async () => {
	try {
		const response = await supabase
			.from("wallets")
			.select(
				"id, description, address, currencies (id, name), networks (id, name, descriptions)"
			)
			.eq("active", true);
		if (response.data) return response;
		return response;
	} catch (error) {
		throw error;
	}
};

export const getWallet = async (id: string) => {
	try {
		const response = await supabase
			.from("wallets")
			.select("*")
			.eq("id", id)
			.eq("active", true);
		if (response.data) return response;
		return response;
	} catch (error) {
		throw error;
	}
};
