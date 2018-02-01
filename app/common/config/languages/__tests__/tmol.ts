import ParsingError from "../../ParsingError";
import parse from "../toml";

const toml = `
tmol = "is"
[pretty]
cool = "foo"
`;
const incorrectToml = `
sometimes
`;

const tomlObj = {
  tmol: "is",
  pretty: {
    cool: "foo"
  }
};

test("Parses tmol", () => {
  expect(parse(toml)).toEqual(tomlObj);
});

test("Throws an parsing error", () => {
  expect(() => parse(incorrectToml)).toThrow(ParsingError);
});
