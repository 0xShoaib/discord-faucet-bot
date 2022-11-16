import { ethers } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { Token, TransactionResponse } from "../types";
import { faucetConfigurations } from "../utils";
import { Networks } from "../enum";
import { getCeloWallet } from "./wallets/get-cello-wallet";
import { getNativeWallet } from "./wallets/get-native-wallet";
import { ERC20_ABI } from "../utils/abi/ERC20";

export const sendTokensOnNetwork = async (
  address: string,
  network: Networks,
  token: Token
): Promise<TransactionResponse> => {
  const { chainId } = faucetConfigurations[network];
  const amount = parseEther(token.amount);

  try {
    if (
      network === Networks.Ethereum_Goerli ||
      network === Networks.Polygon_Mumbai
    ) {
      const wallet = getNativeWallet(chainId, network);

      if (token.chainNative) {
        // 📃 Info - The Wallet class has inherited the Signer class and can sign transactions
        // and messages using a private key as a standard Externally Owned Account (EOA).
        // 📌 Reference - https://docs.ethers.io/v5/api/signer/#Signer-sendTransaction

        const tx = await wallet.sendTransaction({
          to: address,
          value: amount,
        });

        return { txHash: tx.hash, provider: wallet.provider };
      }

      if (token.contractAddress) {
        // 📌 Reference - https://docs.ethers.io/v5/api/contract/contract/#Contract
        const ERC20ContractInstance = new ethers.Contract(
          token.contractAddress,
          ERC20_ABI,
          wallet
        );

        const tx = await ERC20ContractInstance.transfer(address, amount);

        return { txHash: tx.hash, provider: wallet.provider };
      }
    }

    if (network === Networks.Celo_Alfajores) {
      const celloWallet = await getCeloWallet();
      const tx = await celloWallet.sendTransaction({
        to: address,
        value: amount,
      });

      return { txHash: tx.hash, provider: celloWallet.provider };
    }
  } catch (error) {
    console.error("Error while sending tokens");
    console.error(error);
    return { error: true };
  }

  return { error: true };
};
