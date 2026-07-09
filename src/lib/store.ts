/**
 * Simple JSON file-based store for demo persistence.
 * Survives hot reloads. Replace with a real DB in production.
 */
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), ".svarog-data");

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

export function readStore<T>(name: string, fallback: T): T {
  ensureDir();
  const file = path.join(DATA_DIR, `${name}.json`);
  try {
    if (fs.existsSync(file)) {
      return JSON.parse(fs.readFileSync(file, "utf-8")) as T;
    }
  } catch { /* corrupt file — use fallback */ }
  return fallback;
}

export function writeStore<T>(name: string, data: T): void {
  ensureDir();
  const file = path.join(DATA_DIR, `${name}.json`);
  fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf-8");
}
