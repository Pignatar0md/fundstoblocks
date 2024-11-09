import Home from "../components/Icons/home";
import Profile from "../components/Icons/profile";
import QrCode from "../components/Icons/qrCode";
import Settings from "../components/Icons/settings";
import Users from "../components/Icons/users";
import Wallet from "../components/Icons/wallet";

export const adminOptions = [
	{
		name: "Principal",
		employeeVisible: true,
		url: "/Auth/Main",
		icon: <Home />,
	},
	{
		name: "Recibir",
		employeeVisible: true,
		url: "/Auth/Receive",
		icon: <QrCode />,
	},
	{
		name: "Billeteras",
		employeeVisible: false,
		url: "/Auth/Wallets",
		icon: <Wallet />,
	},
	{
		name: "Usuarios",
		url: "/Auth/Users",
		employeeVisible: false,
		icon: <Users />,
	},
	{
		name: "Perfil",
		employeeVisible: true,
		url: "/Auth/Profile",
		icon: <Profile />,
	},
	{
		name: "Configuración",
		employeeVisible: false,
		url: "/Auth/Settings",
		icon: <Settings />,
	},
];
