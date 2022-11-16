import fs from "fs";

/**
 *
 * @param path of the directory from which you want the files
 * @returns an array of string containing files names which ends with .ts
 */
export const getFiles = (path: string): string[] =>
  fs.readdirSync(path).filter((file) => file.endsWith(".ts"));
