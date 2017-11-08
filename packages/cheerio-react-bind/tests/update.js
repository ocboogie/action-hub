import update from "../src/update";

const elem = {
  data(dataName) {
    if (dataName === "update") {
      return () => {};
    }
    throw new Error("Failed");
  }
};

test("works as expected", () => {
  update(elem);
});

const notValidCheerioElem = {};

test("throws when not valid cheerio element", () => {
  expect(() => {
    update(notValidCheerioElem);
  }).toThrow(TypeError("`$elem` is not a valid cheerio element"));
});

const notRegistered = {
  data() {}
};

test("throws when not registered", () => {
  expect(() => {
    update(notRegistered);
  }).toThrow(
    TypeError("`$elem` has not been registered with a `CheerioReactBind`")
  );
});
