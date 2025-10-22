// src/lib/content.ts
import fs from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "src/content");

export const getContent = async <T>(section: string): Promise<T> => {
  const filePath = path.join(CONTENT_DIR, `${section}.json`);
  const file = await fs.promises.readFile(filePath, "utf-8");
  return JSON.parse(file) as T;
};

export const saveContent = async (section: string, data: any): Promise<void> => {
  const filePath = path.join(CONTENT_DIR, `${section}.json`);
  await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2) + "\n");
};