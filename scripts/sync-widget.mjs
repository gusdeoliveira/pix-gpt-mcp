import {copyFileSync, mkdirSync} from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const SCRIPT_DIR=path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR=path.resolve(SCRIPT_DIR,"..");
const SOURCE_PATH=path.resolve(ROOT_DIR,"react","my-app","dist","index.html");
const TARGET_DIR=path.resolve(ROOT_DIR,"public");
const TARGET_PATH=path.resolve(TARGET_DIR,"index.html");

mkdirSync(TARGET_DIR,{recursive: true});
copyFileSync(SOURCE_PATH,TARGET_PATH);

console.log(`Copied widget build to ${TARGET_PATH}`);
