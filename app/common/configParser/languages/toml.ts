import * as toml from "toml";

import ParsingError from "../ParsingError";

export default function(input: string): object {
  try {
    return toml.parse(input);
  } catch (e) {
    if (e instanceof Error) {
      const err: any = e;
      throw new ParsingError(err, err.line, err.column);
    }
    console.log(e instanceof Error);
    throw e;
  }
}
