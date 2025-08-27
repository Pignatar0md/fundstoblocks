"use client";

import { Wallet } from "@/types/Wallet";
import { Transaction } from "@/types/Transaction";
import { createContext, FC, ReactNode, useReducer } from "react";
import { ManagedUser, User } from "@/types/User";
import { ActionType, StoreInitState } from "@/types/State";
import { Currency } from "@/types/Currency";
import { Network } from "@/types/Network";

const storeInitialState = {
	networks: [],
	currencies: [],
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
			ethAddr: "",
			ethPrivateKey: "",
		},
	],
	managedUsers: [
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
		case "SET_CURRENCIES":
			return {
				...state,
				currencies: action.payload as Currency[],
			};
		case "SET_NETWORKS":
			return {
				...state,
				networks: action.payload as Network[],
			};
		case "SET_TRANSACTIONS":
			return {
				...state,
				transactions: action.payload as Transaction[],
			};
		case "SET_MANAGED_USERS":
			return {
				...state,
				managedUsers: action.payload as ManagedUser[],
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
	setNetworks: (networks: Network[]) => void;
	setCurrencies: (currencies: Currency[]) => void;
	setTransactions: (transactions: Transaction[]) => void;
	setUsers: (users: User[]) => void;
	setManagedUsers: (managedUsers: ManagedUser[]) => void;
}>({
	store: storeInitialState,
	setWallets: () => {},
	setNetworks: () => {},
	setCurrencies: () => {},
	setTransactions: () => {},
	setUsers: () => {},
	setManagedUsers: () => {},
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
	const setManagedUsers = (managedUsers: ManagedUser[]) =>
		dispatch({ type: "SET_MANAGED_USERS", payload: managedUsers });
	// const setWallets = (wallets: Wallet[]) =>
	// 	dispatch({ type: "SET_WALLETS", payload: wallets });
	const setNetworks = (networks: Network[]) =>
		dispatch({ type: "SET_NETWORKS", payload: networks });
	const setCurrencies = (currencies: Currency[]) =>
		dispatch({ type: "SET_CURRENCIES", payload: currencies });

	return (
		<StoreContext.Provider
			value={{
				store: state,
				setWallets,
				setTransactions,
				setUsers,
				setManagedUsers,
				setCurrencies,
				setNetworks,
			}}
		>
			{children}
		</StoreContext.Provider>
	);
};
