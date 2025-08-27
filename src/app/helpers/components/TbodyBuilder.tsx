import { dayMonthFormat, hoursMinutesFormat } from "@/app/static/helpers";
import ImageButton from "@/app/components/Buttons/ImageButton";
import Delete from "@/app/components/Icons/delete";
import Confirmed from "@/app/components/Icons/confirmed";
import Validating from "@/app/components/Icons/validating";
import Edit from "@/app/components/Icons/edit";
import { ListType } from "@/types/Components";
import { ListedTransaction } from "@/types/Transaction";
import { ManagedUser } from "@/types/User";
import { Wallet } from "@/types/Wallet";
import { ReactNode } from "react";
import Details from "@/app/components/Icons/details";

const pageChunk = {
	transactions: "",
	wallets: "Wallets/WalletDetails",
	managedUsers: "/Users/UserDetails",
};

export const drawWalletTBody = (
	rows: Wallet[],
	listType: ListType,
	onDelete: (description: string, id: string) => void
): ReactNode => {
	return rows.map(
		(
			{ description, address, networks, currencies, id }: Wallet,
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
								onPress={() => onDelete(description, id)}
							>
								<Delete />
							</ImageButton>
							<ImageButton
								type="link"
								url={`/Auth/${pageChunk[listType]}?operationType=update&id=${id}`}
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

export const drawTransactionTBody = (rows: ListedTransaction[]): ReactNode => {
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
				id,
				from,
				amount,
				status,
				validatingAt,
				wallets,
				confirmationAt,
			}: ListedTransaction,
			index: number
		) => {
			return (
				<tr key={index}>
					<td className={"text-center py-2"}>
						{from?.substring(0, 9) + "..."}
					</td>
					<td className={"text-center py-2"}>{amount}</td>
					<td className={"text-center py-2"}>
						{status ? <Confirmed inlineBlock /> : <Validating inlineBlock />}
					</td>
					<td className={"text-center py-2"}>
						{validatingAt ? formatDate(validatingAt, "date") : ""}
					</td>
					<td className={"text-center py-2"}>
						{validatingAt ? formatDate(validatingAt, "time") : ""}
					</td>
					<td className={"text-center py-2"}>{wallets.description}</td>
					<td className={"text-center py-2"}>
						{confirmationAt ? formatDate(confirmationAt, "time") : ""}
					</td>
					<td className={"text-center py-2"}>
						<ImageButton
							type="link"
							url={`/Auth/Transactions/TransactionDetails?id=${id}`}
						>
							<Details inlineBlock />
						</ImageButton>
					</td>
				</tr>
			);
		}
	);
};

export const drawUserTBody = (
	rows: ManagedUser[],
	listType: ListType,
	onDelete: (description: string, id: string) => void
): ReactNode => {
	return rows.map(({ name, email, $id }: ManagedUser, index: number) => {
		return (
			<tr key={index}>
				<td className={"text-center py-2"}>{$id}</td>
				<td className={"text-center py-2"}>{name}</td>
				<td className={"text-center py-2"}>{email}</td>
				<td className={"flex flex-row py-2 justify-evenly items-end"}>
					<>
						<ImageButton type={"button"} onPress={() => onDelete(name!, $id!)}>
							<Delete />
						</ImageButton>
						<ImageButton
							type="link"
							url={`/Auth/${pageChunk[listType]}?id=${$id}`}
						>
							<Edit />
						</ImageButton>
					</>
				</td>
			</tr>
		);
	});
};
