import ImageButton from "@/app/components/Buttons/ImageButton";
import { ListType } from "@/types/Components";
import { Transaction } from "@/types/Transaction";
import { User } from "@/types/User";
import { Wallet } from "@/types/Wallet";
import { ReactNode } from "react";

export const hoursMinutesFormat = {
	hour: "numeric",
	minute: "numeric",
};

export const dayMonthFormat = {
	month: "numeric",
	day: "numeric",
	year: "numeric",
};

const pageChunk = {
	transactions: "",
	wallets: "Wallets/WalletDetails",
	users: "/Users/UserDetails",
};

export const drawWalletTBody = (
	rows: Wallet[],
	listType: ListType,
	onDelete: (description: string, id: string) => void
): ReactNode => {
	return rows.map(
		(
			{ description, address, networks, currencies, $id }: Wallet,
			index: number
		) => {
			return (
				<tr key={index}>
					<td className={"text-center py-2"}>{description}</td>
					<td className={"text-center py-2"}>
						{address.substring(0, 9) + "..."}
					</td>
					<td className={"text-center py-2"}>{networks.name}</td>
					<td className={"text-center py-2"}>{currencies.name}</td>
					<td className={"flex flex-row py-2 justify-evenly items-end"}>
						<>
							<ImageButton
								type={"button"}
								onPress={() => onDelete(description, $id)}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									className="size-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
									/>
								</svg>
							</ImageButton>
							<ImageButton
								type="link"
								url={`/Auth/${pageChunk[listType]}?operationType=update&id=${$id}`}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									className="size-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
									/>
								</svg>
							</ImageButton>
						</>
					</td>
				</tr>
			);
		}
	);
};

export const drawTransactionTBody = (rows: Transaction[]): ReactNode => {
	const formatDate = (date: string, typeInfo: "date" | "time") => {
		if (!!date) {
			const isTime = typeInfo === "time" ? hoursMinutesFormat : dayMonthFormat;
			const dateToFormat = new Date(date);
			const formattedInfo = `${new Intl.DateTimeFormat("es-AR", isTime).format(
				dateToFormat
			)}`;
			return formattedInfo;
		}
	};

	return rows.map(
		(
			{
				$id,
				from,
				amount,
				status,
				validatingAt,
				wallets,
				confirmationAt,
			}: Transaction,
			index: number
		) => {
			return (
				<tr key={index}>
					<td className={"text-center py-2"}>
						{"..." + $id.substring($id.length - 5)}
					</td>
					<td className={"text-center py-2"}>{from.substring(0, 9) + "..."}</td>
					<td className={"text-center py-2"}>{amount}</td>
					<td className={"text-center py-2"}>{status}</td>
					<td className={"text-center py-2"}>
						{formatDate(validatingAt, "date")}
					</td>
					<td className={"text-center py-2"}>
						{formatDate(validatingAt, "time")}
					</td>
					<td className={"text-center py-2"}>{wallets.description}</td>
					<td className={"text-center py-2"}>
						{formatDate(confirmationAt, "time")}
					</td>
				</tr>
			);
		}
	);
};
export const drawUserTBody = (
	rows: User[],
	listType: ListType,
	onDelete: (description: string, id: string) => void
): ReactNode => {
	return rows.map(({ name, email, accountId }: User, index: number) => {
		return (
			<tr key={index}>
				<td className={"text-center py-2"}>{accountId}</td>
				<td className={"text-center py-2"}>{name}</td>
				<td className={"text-center py-2"}>{email}</td>
				<td className={"flex flex-row py-2 justify-evenly items-end"}>
					<>
						<ImageButton
							type={"button"}
							onPress={() => onDelete(name, accountId)}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="size-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
								/>
							</svg>
						</ImageButton>
						<ImageButton
							type="link"
							url={`/Auth/${pageChunk[listType]}?operationType=update&id=${accountId}`}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="size-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
								/>
							</svg>
						</ImageButton>
					</>
				</td>
			</tr>
		);
	});
};
