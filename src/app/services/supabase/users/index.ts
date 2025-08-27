import { User, UserLogin } from "@/types/User";
import { supabase } from "../../../../../lib/supabase";

export const createAdminUser = async ({
	name,
	email,
	phone,
	ethAddr,
	ethPrivateKey,
}: User) => {
	try {
		const { data } = await supabase.from("users").insert({
			name,
			email,
			phone,
			ethAddress: ethAddr,
			privateKey: ethPrivateKey,
		});
		if (data) {
			return data;
		}
	} catch (error) {
		throw error;
	}
};

export const updateAdminUser = async (user: User, userId: string) => {
	try {
		const response = await supabase
			.from("users")
			.update({
				name: user.name,
				email: user.email,
				avatar: user.avatar,
				phone: user.phone,
			})
			.eq("id", userId)
			.select();
		return response;
	} catch (error) {
		throw error;
	}
};

export const quitAdminUser = async (id: string) => {
	try {
		const response = await supabase.from("users").delete().eq("id", id);
		return response;
	} catch (error) {
		throw error;
	}
};

export const getAdminUsers = async () => {
	try {
		const response = await supabase.from("users").select("*");
		if (response.data) return response;
	} catch (error) {
		throw error;
	}
};

export const getAdminUserByEmail = async (email: string) => {
	try {
		const response = await supabase
			.from("users")
			.select("*")
			.eq("email", email);
		if (response.data) return response;
	} catch (error) {
		throw error;
	}
};

//---------------------------------- USER ACCOUNTS MANAGEMENT

export const signOut = async () => {
	try {
		const response = await supabase.auth.signOut();
		return response;
	} catch (error) {
		throw error;
	}
};

export const signIn = async ({ password, email }: UserLogin) => {
	try {
		const { data } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		return data;
	} catch (error) {
		throw error;
	}
};

export const signUp = async ({ password, email }: UserLogin) => {
	try {
		const { data } = await supabase.auth.signUp({
			email,
			password,
		});
		return data;
	} catch (error) {
		throw error;
	}
};

export const resetPassword = async (
	email: string,
	resetPasswordPage: string
) => {
	try {
		const { data: resetData } = await supabase.auth.resetPasswordForEmail(
			email,
			{
				redirectTo: resetPasswordPage,
			}
		);
		return resetData;
	} catch (error) {
		throw error;
	}
};
