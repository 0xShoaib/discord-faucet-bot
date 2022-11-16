import { Document } from "mongoose";

type NetworkAndToken = {
  combination: string;
  timestamp: Date;
};

export interface IWallet extends Document {
  address: string;
  networks_and_tokens: NetworkAndToken[];
}
