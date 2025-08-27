import Web3 from "web3";
import { web3Config } from "../supabase/init";
// import polygon_abi from "./polygon_abi.json";

type Network = "Polygon" | "Ethereum" | "Avalanche" | "BSC" | "Arbitrum";

const makeTransfer = async (
	network: Network,
	receiver: string,
	amount: string,
	walletPK: string
) => {
	const web3 = new Web3(
		`https://mainnet.infura.io/v3/${web3Config.INFURA_API_KEY}`
	);

	const myAccount = web3.eth.accounts.privateKeyToAccount(walletPK);

	const txObject = {
		from: myAccount.address,
		to: receiver,
		maxPriorityFeePerGas: 10_000,
		maxFeePerGas: 100_000_000_000,
		value: amount,
		// data
		// nonce
	};

	const signatureObject = await myAccount.signTransaction(txObject);

	const txReceipt = await web3.eth.sendSignedTransaction(
		signatureObject.rawTransaction
	);
	console.log("tx receipt: ", txReceipt);
};

// const signTx = async (account: any) => {
// };

export default makeTransfer;
