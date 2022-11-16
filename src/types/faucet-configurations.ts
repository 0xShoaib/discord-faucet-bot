import { Networks, Tokens } from "../enum";

export type Token = {
  chainNative: boolean;
  contractAddress?: string;
  amount: string;
  cooldown: number;
};

export type FaucetConfigurations = {
  [name in Networks]: {
    chainId: number;
    blockExplorerURL: string;
    tokens: {
      [name in Tokens]?: Token;
    };
  };
};
