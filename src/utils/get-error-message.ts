import { Networks, Tokens } from "../enum";
import { capitalize } from "./capitalize-string";

export const getErrorMessage = (token: Tokens, network: Networks): string =>
  `Ops! An error occurred when processing ${token.toUpperCase()} on ${capitalize(
    network
  )}.`;
