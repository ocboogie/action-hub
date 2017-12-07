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
  test("Calls all listeners with the correct message", () => {
    const debugMsg = "This is a debug message";
    logger.report("debug", debugMsg);
    expect(mockListener.mock.calls[0][0]).toBe(debugMsg);
  });

  test("Only reports to the specified category", () => {
    const warnMockListener = jest.fn();
    logger.addListener("warn", warnMockListener);
    logger.report("debug", "This is not a warn message");

    expect(warnMockListener.mock.calls.length).toBe(0);
  });

  test("Logs to history", () => {
    const reportMsg = "This should be in the history";

    logger.report("debug", reportMsg);

    expect(logger.history[0]).toEqual({ category: "debug", msg: reportMsg });
  });

  test("Conforms to history limit", () => {
    logger.historyLimit = 1;
    logger.report("debug", "foo");

    expect(logger.history.length).toBe(1);
  });
});
