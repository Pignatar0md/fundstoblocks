"use client";
import React from "react";
import { useRouter } from "next/navigation";
import SidebarMenuItem from "./SidebarMenuItem";
import Modal from "../Modal";
import { adminOptions } from "@/app/static/components";
import { signOut } from "@/app/services/appwrite/users";
import Logout from "../Icons/logout";

export default function Sidebar() {
	const [showModal, setShowModal] = React.useState(false);
	const router = useRouter();

	const endSession = async () => {
		await signOut();
		setShowModal(false);
		router.push("/");
	};

	return (
		<div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
			<Modal
				showModal={showModal}
				setShowModal={setShowModal}
				title={"Cerrar Sesión"}
				body={
					"Estás a punto de finalizar tu sesión. Seguro que quieres hacer esto?"
				}
				acceptButtonText={"Si"}
				cancelButtonText={"No"}
				onAccept={() => endSession()}
			/>
			<div className="mb-2 p-4">
				<h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-gray-900">
					Funds to Blocks
				</h5>
			</div>
			<nav className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">
				{adminOptions.map(({ name, icon, url, employeeVisible }) => (
					<SidebarMenuItem
						key={name}
						name={name}
						icon={icon}
						url={url}
						employeeVisible={employeeVisible}
					/>
				))}
				<div
					role="button"
					onClick={() => setShowModal(true)}
					tabIndex={0}
					className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 outline-none"
				>
					<div className="grid place-items-center mr-4">
						<Logout />
					</div>
					Salir
				</div>
			</nav>
		</div>
	);
}
