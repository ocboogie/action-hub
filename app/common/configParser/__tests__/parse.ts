import parse from "../parse";

const toml = `
tmol = "is"
[pretty]
cool = "foo"
`;

const tomlObj = {
  tmol: "is",
  pretty: {
    cool: "foo"
  }
};

test("Parses known languages", () => {
  expect(parse(toml, "toml")).toEqual(tomlObj);
});

test("Throws when incorrect language type", () => {
  expect(() => parse("This shouldn't matter", "not a real language")).toThrow(
    TypeError
  );
});
