import { supabase } from "../../../../../lib/supabase";

export const addNetwork = async ({
	name,
	descriptions,
}: {
	name: string;
	descriptions: string;
}) => {
	try {
		const response = await supabase.from("networks").insert({
			name,
			descriptions,
		});
		if (!response.error) return response.data;
	} catch (error) {
		throw error;
	}
};

export const updateNetwork = async (
	network: { name: string; description: string },
	id: string
) => {
	try {
		const response = await supabase
			.from("networks")
			.update({
				name: network.name,
				descriptions: network.description,
			})
			.eq("id", id)
			.select();
		return response;
	} catch (error) {
		throw error;
	}
};

export const quitNetwork = async (id: string) => {
	try {
		const response = await supabase.from("networks").delete().eq("id", id);
		if (!response.error) return response.data;
	} catch (error) {
		throw error;
	}
};

export const getNetworks = async () => {
	try {
		const response = await supabase.from("networks").select("*");
		if (!response.error) return response.data;
	} catch (error) {
		throw error;
	}
};

export const getNetwork = async (id: string) => {
	try {
		const response = await supabase.from("networks").select("*").eq("id", id);
		if (!response.error) return response.data;
	} catch (error) {
		throw error;
	}
};
