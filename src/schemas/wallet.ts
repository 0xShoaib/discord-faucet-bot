import { Schema, model } from "mongoose";
import { IWallet } from "../types";

const walletSchema = new Schema<IWallet>({
  address: { type: String, required: true },

  networks_and_tokens: [
    {
      combination: String,
      timestamp: Date,
    },
  ],
});

module.exports = model("Wallet", walletSchema, "wallets");
