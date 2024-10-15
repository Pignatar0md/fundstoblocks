"use client";

import { Wallet } from "@/types/Wallet";
import { Transaction } from "@/types/Transaction";
import { createContext, FC, ReactNode, useReducer } from "react";
import { User } from "@/types/User";
import { ActionType, StoreInitState } from "@/types/State";

const storeInitialState = {
	wallets: [
		{
			description: "",
			address: "",
			networks: { name: "", $id: "" },
			currencies: { name: "", $id: "" },
			$id: "",
		},
	],
	transactions: [
		{
			$id: "",
			from: "",
			amount: "",
			status: "",
			wallets: { description: "", $id: "" },
			confirmationAt: "",
			validatingAt: "",
		},
	],
	users: [
		{
			$id: "",
			accountId: "",
			name: "",
			email: "",
			avatar: "",
			phone: "",
		},
	],
};

const storeReducer = (state: StoreInitState, action: ActionType) => {
	switch (action.type) {
		case "SET_WALLETS":
			return {
				...state,
				wallets: action.payload as Wallet[],
			};
		case "SET_TRANSACTIONS":
			return {
				...state,
				transactions: action.payload as Transaction[],
			};
		case "SET_USERS":
			return {
				...state,
				users: action.payload as User[],
			};
		default:
			return state;
	}
};

export const StoreContext = createContext<{
	store: StoreInitState;
	setWallets: (wallets: Wallet[]) => void;
	setTransactions: (transactions: Transaction[]) => void;
	setUsers: (users: User[]) => void;
}>({
	store: storeInitialState,
	setWallets: () => {},
	setTransactions: () => {},
	setUsers: () => {},
});

export const StoreContextProvider: FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [state, dispatch] = useReducer(storeReducer, storeInitialState);

	const setWallets = (wallets: Wallet[]) =>
		dispatch({ type: "SET_WALLETS", payload: wallets });
	const setTransactions = (transactions: Transaction[]) =>
		dispatch({ type: "SET_TRANSACTIONS", payload: transactions });
	const setUsers = (users: User[]) =>
		dispatch({ type: "SET_USERS", payload: users });
	// const setWallets = (wallets: Wallet[]) =>
	// 	dispatch({ type: "SET_WALLETS", payload: wallets });

	return (
		<StoreContext.Provider
			value={{
				store: state,
				setWallets,
				setTransactions,
				setUsers,
			}}
		>
			{children}
		</StoreContext.Provider>
	);
};
