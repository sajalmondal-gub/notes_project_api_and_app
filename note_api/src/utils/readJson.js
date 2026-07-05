import fs from "fs/promises";
import path from "path";

export default async function readJson(fileName) {
  try {
    const filePath = path.join(__dirname, "../data", fileName);
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
};
