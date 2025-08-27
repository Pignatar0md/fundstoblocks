import { supabase } from "../../../../../lib/supabase";

export const addCurrency = async ({
	name,
	description,
}: {
	name: string;
	description: string;
}) => {
	try {
		const response = await supabase.from("currencies").insert({
			name,
			description,
		});
		if (!response.error) return response.data;
	} catch (error) {
		throw error;
	}
};

export const updateCurrency = async (
	{
		name,
		description,
	}: {
		name: string;
		description: string;
	},
	currencyId: string
) => {
	// UPDATE
	try {
		const response = supabase
			.from("currencies")
			.update({
				name,
				description,
			})
			.eq("id", currencyId)
			.select();
		return response;
	} catch (error) {
		throw error;
	}
};

export const quitCurrency = async (id: string) => {
	// DELETE
	try {
		const response = supabase.from("currencies").delete().eq("id", id);
		return response;
	} catch (error) {
		throw error;
	}
};

export const getCurrencies = async () => {
	// SELECT ALL
	try {
		const response = await supabase.from("currencies").select("*");
		if (!response.error) return response.data;
	} catch (error) {
		throw error;
	}
};

export const getCurrency = async (id: string) => {
	// SELECT
	try {
		const response = await supabase.from("currencies").select("*").eq("id", id);
		if (!response.error) return response.data;
	} catch (error) {
		throw error;
	}
};
