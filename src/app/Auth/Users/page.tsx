"use client";
import { useContext, useEffect, useState } from "react";
import Modal from "@/app/components/Modal";
import PaginatedList from "@/app/components/PaginatedList";
import SearchField from "@/app/components/Inputs/SearchField";
import ImageButton from "@/app/components/Buttons/ImageButton";
import { StoreContext } from "@/state/GlobalProvider";
import { getUsers } from "@/app/services/appwrite/users";

export default function UsersPage() {
	const [searchValue, setSearchValue] = useState("");
	const [showModal, setShowModal] = useState({ showing: false, userName: "" });

	const { store, setUsers } = useContext(StoreContext);

	useEffect(() => {
		const getUsersList = async () => {
			const response = await getUsers();
			setUsers(response);
		};
		getUsersList();
	}, []);

	const runSearch = () => {
		return [];
	};

	return (
		<div className="flex lg:w-full justify-center items-center space-y-8">
			<Modal
				showModal={showModal.showing}
				setShowModal={() => setShowModal({ ...showModal, showing: false })}
				title={"Eliminar"}
				body={`Estás a punto de eliminar el usuario ${showModal.userName}. Seguro que quieres hacer esto?`}
				acceptButtonText={"Si"}
				cancelButtonText={"No"}
				onAccept={() => ({})}
			/>
			<div className="w-full px-8 md:px-32 lg:px-24">
				<div className="bg-white rounded-md shadow-2xl p-5">
					<h1 className="text-gray-800 text-center font-bold text-2xl mb-1">
						Listado de Usuarios
					</h1>
					<div className="flex flex-row items-center justify-between">
						<div className="max-w-2xl">
							<ImageButton
								type="link"
								url="/Auth/Users/UserDetails?operationType=add"
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
								setValue={(e: React.ChangeEvent<HTMLInputElement>) =>
									setSearchValue(e.target.value)
								}
							/>
						</div>
					</div>
					<PaginatedList
						listType="users"
						rows={store.users}
						heads={["#", "Nombre", "e-mail", "Acciones"]}
					/>
				</div>
			</div>
		</div>
	);
}
