import { supabase } from "../../../../lib/supabase";

export const subscribeToTransactions = (callback: () => {}) => {
	supabase
		.channel("transactions-follow-up")
		.on(
			"postgres_changes",
			{
				event: "*",
				schema: "public",
				table: "transactions",
			},
			() => {
				callback();
			}
		)
		.subscribe();
};

export const unsubscribeToTransactions = (channel: any) => {
	supabase.removeChannel(channel);
};
