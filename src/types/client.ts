import { Client, Collection } from "discord.js";

export interface IClient extends Client {
  commands?: Collection<any, any>;
  commandArray?: string[];
  handleCommands?: VoidFunction;
  handleEvents?: VoidFunction;
}
