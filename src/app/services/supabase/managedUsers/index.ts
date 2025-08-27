import { ManagedUser } from "@/types/User";
import { supabase } from "../../../../../lib/supabase";

export const addManagedUser = async ({ name, email, users }: ManagedUser) => {
	// CREATE
	try {
		const { data } = await supabase.from("managed_users").insert({
			name,
			email,
			users,
		});
		if (data) return data;
	} catch (error) {
		throw error;
	}
};
export const updateManagedUser = async (user: ManagedUser, userId: string) => {
	// UPDATE
	try {
		const response = await supabase
			.from("managed_users")
			.update({
				name: user.name,
				email: user.name,
			})
			.eq("id", userId)
			.select();
		return response;
	} catch (error) {
		throw error;
	}
};

export const quitManagedUser = async (id: string) => {
	// DELETE
	try {
		const response = supabase.from("managed_users").delete().eq("id", id);
		return response;
	} catch (error) {
		throw error;
	}
};

export const getManagedUsers = async () => {
	// SELECT ALL
	try {
		const { data } = await supabase.from("managed_users").select("*");
		if (data) return data;
	} catch (error) {
		throw error;
	}
};

export const getManagedUser = async (id: string) => {
	// SELECT
	try {
		const response = await supabase
			.from("managed_users")
			.select("*")
			.eq("id", id);
		if (response) return response.data;
	} catch (error: any) {
		throw new Error(error);
	}
};
