const web3Config = {
	INFURA_API_KEY: process.env.INFURA_API_KEY,
};

const cryptoApisConfig = {
	API_KEY: process.env.CRYPTOAPIS_API_KEY,
	URL: process.env.CRYPTOAPIS_URL,
};

const cryptoNetworks = {
	Polygon: process.env.POLYGON_CONTRACT_ADDRESS,
	Ethereum: process.env.ETHEREUM_CONTRACT_ADDRESS,
	Avalanche: process.env.AVALANCHE_CONTRACT_ADDRESS,
	BSC: process.env.BSC_CONTRACT_ADDRESS,
	Arbitrum: process.env.ARBITRUM_CONTRACT_ADDRESS,
};

const loggedInUserStorageKeys = {
	walletAddress: "walletAddress",
	networks: "networks",
	currencies: "currencies",
	providerUid: "providerUid",
	userId: "userId",
	id: "id",
	accountId: "accountId",
	avatar: "avatar",
	email: "email",
	name: "name",
	phone: "phone",
};

export {
	web3Config,
	cryptoNetworks,
	loggedInUserStorageKeys,
	cryptoApisConfig,
};
