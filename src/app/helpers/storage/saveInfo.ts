import { loggedInUserStorageKeys } from "@/app/services/supabase/init";

export const saveUserInfo = async (loggedInUserData: any) => {
	await sessionStorage.setItem(
		loggedInUserStorageKeys.walletAddress,
		loggedInUserData?.data[0].ethAddress
	);
	await sessionStorage.setItem(
		loggedInUserStorageKeys.userId,
		loggedInUserData?.data[0].id
	);
};

export const saveSessionInfo = async (signInResult: any) => {
	await sessionStorage.setItem(
		"accessToken",
		signInResult.session.access_token
	);
	await sessionStorage.setItem(
		"expiresAt",
		signInResult.session.expires_at?.toString() as string
	);
	await sessionStorage.setItem(
		"expiresIn",
		signInResult.session.expires_in.toString() as string
	);
	await sessionStorage.setItem(
		loggedInUserStorageKeys.providerUid,
		signInResult.user.app_metadata.provider!
	);
	await sessionStorage.setItem(
		loggedInUserStorageKeys.email,
		signInResult.user.email || ""
	);
	await sessionStorage.setItem(
		loggedInUserStorageKeys.phone,
		signInResult.user.phone as string
	);
};
