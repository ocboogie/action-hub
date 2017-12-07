import ParsingError from "../ParsingError";

let parsingError: ParsingError;

const errorMessage = "Oh no!";
const line = 1;
const column = 2;

test("Create ParsingError without throwing", () => {
  parsingError = new ParsingError(new Error(errorMessage), line, column);
});

test("Correct message", () => {
  expect(parsingError.message).toBe(
    `Parsing error at line: ${line}, column: ${column}: ${errorMessage}`
  );
});
