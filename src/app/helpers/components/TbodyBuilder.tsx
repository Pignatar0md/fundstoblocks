import ImageButton from "@/app/components/Buttons/ImageButton";
import Delete from "@/app/components/Icons/delete";
import Edit from "@/app/components/Icons/edit";
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
								<Delete />
							</ImageButton>
							<ImageButton
								type="link"
								url={`/Auth/${pageChunk[listType]}?operationType=update&id=${$id}`}
							>
								<Edit />
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
							onPress={() => onDelete(name!, accountId!)}
						>
							<Delete />
						</ImageButton>
						<ImageButton
							type="link"
							url={`/Auth/${pageChunk[listType]}?id=${accountId}`}
						>
							<Edit />
						</ImageButton>
					</>
				</td>
			</tr>
		);
	});
};
