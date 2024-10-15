export function getNetworkOptions(token: string) {
	let commonNetworkOptions = [
		{ value: "BEP20", text: "BNB Chain(BEP20)" },
		{ value: "AVAX", text: "AVAX C-Chain" },
		{ value: "ERC20", text: "Ethereum (ERC20)" },
		{ value: "Optimism", text: "Optimism" },
		{ value: "Polygon", text: "Polygon" },
	];
	const busdNetworkOptions = [];
	const daiNetworkOptions = [];
	const usdcNetworkOptions = [
		{ value: "zksync", text: "zkSync Era" },
		{ value: "base", text: "Base" },
		{ value: "stellar", text: "Stellar" },
	];
	const usdtNetworkOptions = [
		{ value: "TRC20", text: "Tron (TRC20)" },
		{ value: "Arbitrum", text: "Arbitrum" },
	];
	if (token === "USDC") {
		commonNetworkOptions = [...commonNetworkOptions, ...usdcNetworkOptions];
	}
	if (token === "USDT") {
		commonNetworkOptions = [...commonNetworkOptions, ...usdtNetworkOptions];
	}
	if (token === "BUSD") {
	}
	if (token === "DAI") {
	}
	return commonNetworkOptions;
}
