import * as path from "path";

import * as fs from "fs-extra";

import parse from "./parse";
import ParsingError from "./ParsingError";

export default function(configPath: string): object {
  const type = path.extname(configPath).substr(1);
  const contents = fs.readFileSync(configPath, "utf8");
  let parsedCode;
  try {
    parsedCode = parse(contents, type);
  } catch (e) {
    if (e instanceof ParsingError) {
      e.filePath = configPath;
    }
    throw e;
  }
  return parsedCode;
}
