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
    // instanceof wasn't working
    if (e.name && e.name === "ParsingError") {
      throw new ParsingError(e.error, e.line, e.column, configPath);
    }
    throw e;
  }
  return parsedCode;
}
