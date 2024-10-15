"use client";
import { useContext, useEffect, useState } from "react";
import PaginatedList from "@/app/components/PaginatedList";
import SearchField from "@/app/components/Inputs/SearchField";
import ImageButton from "@/app/components/Buttons/ImageButton";
import Modal from "@/app/components/Modal";

import { getWallets, quitWallet } from "@/app/services/appwrite/wallets";
import { StoreContext } from "@/state/GlobalProvider";
import { Wallet } from "@/types/Wallet";

export default function WalletsPage() {
	const { store, setWallets } = useContext(StoreContext);
	const modalWalletsInitState = {
		showing: false,
		walletDescription: "",
		walletId: "",
	};
	const [searchValue, setSearchValue] = useState("");
	const [showModal, setShowModal] = useState(modalWalletsInitState);

	const getWalletList = async () => {
		const { documents } = await getWallets();
		setWallets(documents as unknown as Wallet[]);
	};

	useEffect(() => {
		getWalletList();
	}, []);

	const runSearch = () => {
		return [];
	};

	const deleteWallet = async () => {
		const response = await quitWallet(showModal.walletId);
		if (response?.message === "") {
			setShowModal(modalWalletsInitState);
		}
		getWalletList();
	};

	return (
		<div className="flex lg:w-full justify-center items-center space-y-8">
			<Modal
				showModal={showModal.showing}
				setShowModal={() => setShowModal({ ...showModal, showing: false })}
				title={"Eliminar"}
				body={`Estás a punto de elimnar la billetera ${showModal.walletDescription}. Seguro que quieres hacer esto?`}
				acceptButtonText={"Si"}
				cancelButtonText={"No"}
				onAccept={deleteWallet}
			/>
			<div className="w-full px-8 md:px-32 lg:px-24">
				<div className="bg-white rounded-md shadow-2xl p-5">
					<h1 className="text-gray-800 text-center font-bold text-2xl mb-1">
						Lista de Billeteras
					</h1>
					<div className="flex flex-row items-center justify-between">
						<div className="max-w-2xl">
							<ImageButton
								type="link"
								url="/Auth/Wallets/WalletDetails?operationType=add"
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
										d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
									/>
								</svg>
							</ImageButton>
						</div>
						<div className="w-6/12">
							<SearchField
								runSearch={runSearch}
								value={searchValue}
								setValue={(e) => setSearchValue(e.target.value)}
							/>
						</div>
					</div>

					<PaginatedList
						rows={store.wallets}
						listType={"wallets"}
						onDelete={(description: string, id: string) =>
							setShowModal({
								showing: true,
								walletDescription: description,
								walletId: id,
							})
						}
						heads={["Descripción", "Address", "Red", "Moneda", "Acciones"]}
					/>
				</div>
			</div>
		</div>
	);
}
