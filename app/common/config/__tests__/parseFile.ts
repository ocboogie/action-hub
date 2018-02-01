import parseFile from "../parseFile";
import ParsingError from "../ParsingError";

const incorrectTomlFilePath = "./app/common/config/__tests__/incorrect.toml";

const tomlObj = {
  tmol: "is",
  pretty: {
    cool: "foo"
  }
};

test("Parses known file types", () => {
  expect(parseFile("./app/common/config/__tests__/correct.toml")).toEqual(
    tomlObj
  );
});

test("Injects file path to ParsingError", () => {
  try {
    parseFile(incorrectTomlFilePath);
  } catch (e) {
    expect(e instanceof ParsingError).toBeTruthy();
  }
});

test("Injects file path to ParsingError", () => {
  try {
    parseFile(incorrectTomlFilePath);
  } catch (e) {
    if (!(e instanceof ParsingError)) {
      throw e;
    }
    expect(e.filePath).toBe(incorrectTomlFilePath);
  }
});
