import Logger from "../Logger";

let logger: Logger;
const categories = ["debug", "warn"];

test("Create logger successfully", () => {
  logger = new Logger(categories);
});

describe("hasCategory function", () => {
  test("HasCategory returns true if category is found", () => {
    expect(logger.hasCategory("debug")).toBe(true);
  });

  test("Returns false if category is not found", () => {
    expect(logger.hasCategory("This is not a category")).toBe(false);
  });
});

const mockListener = jest.fn();
describe("addListener function", () => {
  test("Adds a listener to a category", () => {
    logger.addListener("debug", mockListener);
  });

  test("Throws when unknown category is given", () => {
    expect(() => {
      logger.addListener("This is not a category", () => undefined);
    }).toThrow(TypeError);
  });
});

describe("report function", () => {
  test("report calls all listeners with the correct message", () => {
    const debugMsg = "This is a debug message";
    logger.report("debug", debugMsg);
    expect(mockListener.mock.calls[0][0]).toBe(debugMsg);
  });

  test("report only reports to the specified category", () => {
    const warnMockListener = jest.fn();
    logger.addListener("warn", warnMockListener);
    logger.report("debug", "This is not a warn message");

    expect(warnMockListener.mock.calls.length).toBe(0);
  });
});
