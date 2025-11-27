// src/lib/content.ts
import fs from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "src", "content");

export const getContent = async <T>(section: string): Promise<T> => {
  const filePath = path.join(CONTENT_DIR, `${section}.json`);
  const file = await fs.promises.readFile(filePath, "utf-8");
  return JSON.parse(file) as T;
};

export const saveContent = async (section: string, data: any): Promise<void> => {
  const filePath = path.join(CONTENT_DIR, `${section}.json`);
  await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2) + "\n");
};

const PAGES_DIR = path.join(CONTENT_DIR, "pages");
const DEFAULT_DIR = path.join(CONTENT_DIR, "default");

const readJsonFile = async (filePath: string) => {
  const raw = await fs.promises.readFile(filePath, "utf-8");
  return JSON.parse(raw);
};

export const getSectionContent = async <T = any>(page: string, section: string): Promise<T> => {
  // try page-specific file first
  const pageFile = path.join(PAGES_DIR, page, `${section}.json`);
  if (fs.existsSync(pageFile)) {
    return (await readJsonFile(pageFile)) as T;
  }

  // fallback to default folder
  const defaultFile = path.join(DEFAULT_DIR, `${section}.json`);
  if (fs.existsSync(defaultFile)) {
    return (await readJsonFile(defaultFile)) as T;
  }

  // final fallback: top-level content (legacy)
  const legacyFile = path.join(CONTENT_DIR, `${section}.json`);
  if (fs.existsSync(legacyFile)) {
    return (await readJsonFile(legacyFile)) as T;
  }

  throw new Error(`Section file not found for page='${page}', section='${section}'`);
};

export const saveSectionContent = async (page: string, section: string, data: any): Promise<void> => {
  const pageDir = path.join(PAGES_DIR, page);
  if (!fs.existsSync(pageDir)) {
    await fs.promises.mkdir(pageDir, { recursive: true });
  }
  const filePath = path.join(pageDir, `${section}.json`);
  await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2) + "\n", "utf-8");
};
