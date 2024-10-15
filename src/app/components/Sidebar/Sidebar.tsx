"use client";
import React from "react";
import { useRouter } from "next/navigation";
import SidebarMenuItem from "./SidebarMenuItem";
import Modal from "../Modal";
import { adminOptions } from "@/app/static/components";
import { signOut } from "@/app/services/appwrite/users";

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
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							aria-hidden="true"
							className="h-5 w-5"
						>
							<path
								fillRule="evenodd"
								d="M12 2.25a.75.75 0 01.75.75v9a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM6.166 5.106a.75.75 0 010 1.06 8.25 8.25 0 1011.668 0 .75.75 0 111.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 011.06 0z"
								clipRule="evenodd"
							></path>
						</svg>
					</div>
					Salir
				</div>
			</nav>
		</div>
	);
}
