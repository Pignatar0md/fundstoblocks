"use client";
import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SidebarMenuItem = {
	name: string;
	url: string;
	icon: ReactNode;
	employeeVisible: boolean;
};

export default function SidebarMenuItem({
	name,
	url,
	icon,
	employeeVisible,
}: SidebarMenuItem) {
	const pathname = usePathname();
	const pressedStyle =
		pathname === url
			? "active:bg-blue-50 active:bg-opacity-80 active:text-blue-900"
			: "";
	const isAdmin = true;
	if (isAdmin) {
		return (
			<Link
				href={url}
				className={`flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 ${pressedStyle} hover:text-blue-900 focus:text-blue-900 outline-none`}
			>
				<div className="grid place-items-center mr-4">{icon}</div>
				{name}
			</Link>
		);
	} else {
		if (employeeVisible) {
			return (
				<Link
					href={url}
					className={`flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 ${pressedStyle} hover:text-blue-900 focus:text-blue-900 outline-none`}
				>
					<div className="grid place-items-center mr-4">{icon}</div>
					{name}
				</Link>
			);
		}
	}
}
