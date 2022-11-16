import { Networks, Tokens } from "../enum";
import { faucetConfigurations } from "./faucet-configurations";

export const checkIsCombinationValid = (
  network: Networks,
  token: Tokens
): boolean => faucetConfigurations[network].tokens[token] !== undefined;
