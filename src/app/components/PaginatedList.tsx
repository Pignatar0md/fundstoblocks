import { Wallet } from "@/types/Wallet";
import { Transaction } from "@/types/Transaction";
import { User } from "@/types/User";
import { ListType } from "@/types/Components";
import {
	drawTransactionTBody,
	drawUserTBody,
	drawWalletTBody,
} from "../helpers/components/TbodyBuilder";
import Link from "next/link";

export default function PaginatedList({
	heads,
	rows,
	listType,
	onDelete,
}: {
	heads: string[];
	listType: ListType;
	rows: Wallet[] | Transaction[] | User[];
	onDelete?: (description: string, id: string) => void;
}) {
	return (
		<>
			<table className="border rounded-lg w-full table-fixed">
				<thead className="bg-slate-200">
					<tr>
						{heads.map((title: string) => (
							<th key={title} className="py-2">
								{title}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{listType === "wallets"
						? drawWalletTBody(rows as Wallet[], listType, onDelete!)
						: listType === "transactions"
						? drawTransactionTBody(rows as Transaction[])
						: drawUserTBody(rows as User[], listType, onDelete!)}
				</tbody>
			</table>
			<div className="text-center my-8 max-w-2xl mx-auto">
				<nav aria-label="Page navigation example">
					<ul className="inline-flex -space-x-px">
						<li>
							<Link
								href="#"
								className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
							>
								Anterior
							</Link>
						</li>
						<li>
							<a
								href="#"
								className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
							>
								1
							</a>
						</li>
						<li>
							<a
								href="#"
								className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
							>
								2
							</a>
						</li>
						<li>
							<a
								href="#"
								aria-current="page"
								className="bg-blue-50 border border-gray-300 text-blue-600 hover:bg-blue-100 hover:text-blue-700  py-2 px-3 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
							>
								3
							</a>
						</li>
						<li>
							<a
								href="#"
								className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
							>
								4
							</a>
						</li>
						<li>
							<a
								href="#"
								className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
							>
								5
							</a>
						</li>
						<li>
							<a
								href="#"
								className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-r-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
							>
								Siguiente
							</a>
						</li>
					</ul>
				</nav>
			</div>
		</>
	);
}
