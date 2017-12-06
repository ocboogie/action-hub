export default class ParsingError extends Error {
  public line: number;
  public column: number;
  public filePath: string;
  public error: Error;

  public constructor(
    err: Error,
    line: number,
    column: number,
    filePath?: string
  ) {
    super();

    this.name = "ParsingError";
    this.line = line;
    this.column = column;
    this.filePath = filePath;
    this.message = `Parsing error at line: ${line}, column: ${column}${
      filePath ? ` in "${filePath}"` : ""
    }: ${err.message}`;

    this.error = err;

    Error.captureStackTrace(this, this.constructor);
  }
}
