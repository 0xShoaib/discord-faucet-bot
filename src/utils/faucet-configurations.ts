import { Networks, Tokens } from "../enum";
import { FaucetConfigurations } from "../types";

export const faucetConfigurations: FaucetConfigurations = {
  [Networks.Ethereum_Goerli]: {
    chainId: 5,
    blockExplorerURL: "https://goerli.etherscan.io/tx/",
    tokens: {
      [Tokens.ETH]: {
        chainNative: true,
        amount: "0.1",
        cooldown: 24, // Cooldown time should be in 24 Hours Format
      },
      // LINK token object values are same on both Ethereum and Polygon networks.
      // Although, here keeping it different for having separate configuration for amount and cooldown period.
      [Tokens.LINK]: {
        chainNative: false,
        contractAddress: "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",
        amount: "0.1",
        cooldown: 24, // Cooldown time should be in 24 Hours Format
      },
    },
  },
  [Networks.Polygon_Mumbai]: {
    chainId: 80001,
    blockExplorerURL: "https://mumbai.polygonscan.com/tx/",
    tokens: {
      [Tokens.MATIC]: {
        chainNative: true,
        amount: "0.1",
        cooldown: 24, // Cooldown time should be in 24 Hours Format
      },
      // LINK token object values are same on both Ethereum and Polygon networks.
      // Although, here keeping it different for having separate configuration for amount and cooldown period.
      [Tokens.LINK]: {
        chainNative: false,
        contractAddress: "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",
        amount: "0.1",
        cooldown: 24, // Cooldown time should be in 24 Hours Format
      },
    },
  },
  [Networks.Celo_Alfajores]: {
    chainId: 42220,
    blockExplorerURL: "https://alfajores.celoscan.io/tx/",
    tokens: {
      [Tokens.CELO]: {
        chainNative: true,
        amount: "0.1",
        cooldown: 24, // Cooldown time should be in 24 Hours Format
      },
    },
  },
};
