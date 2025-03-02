import { supabase } from "../../lib/supabase";

export const useSupabase = () => {
	const getSession = async () => {
		const { data } = await supabase.auth.getSession();
		if (data.session)
			await setSession(
				data?.session?.access_token,
				data.session?.refresh_token
			);
		return data.session;
	};

	const setSession = async (access_token: string, refresh_token: string) => {
		const result = await supabase.auth.setSession({
			access_token,
			refresh_token,
		});
		if (result.data) {
			return true;
		}
		if (result.error) {
			return false;
		}
	};

	const refreshSession = async () => {
		const result = await supabase.auth.refreshSession();
		return result.data.session;
	};

	return {
		getSession,
		refreshSession,
		setSession,
	};
};
