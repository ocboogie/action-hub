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

describe("Reporting", () => {
  test("Calls all listeners with the correct message", () => {
    const debugMsg = "This is a debug message";
    logger.report("debug", debugMsg);
    expect(mockListener.mock.calls[0][0].title).toBe(debugMsg);
  });

  test("Calls all listeners with the correct description", () => {
    const debugMsg = "This is a debug message with a description";
    const descriptionMsg = "This is a debug message description";
    logger.report("debug", debugMsg, descriptionMsg);
    expect(mockListener.mock.calls[1][0].description).toBe(descriptionMsg);
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

    expect(logger.history[0]).toEqual({
      category: "debug",
      msg: { title: reportMsg }
    });
  });

  test("Conforms to history limit", () => {
    logger.historyLimit = 1;
    logger.report("debug", "foo");

    expect(logger.history.length).toBe(1);
  });

  describe("Disposing", () => {
    test("report returns a function to dispose the corresponding listener", () => {
      const listener = jest.fn();
      const dispose = logger.addListener("warn", listener);

      logger.report("warn", "foo");
      dispose();
      logger.report("warn", "bar");

      expect(listener.mock.calls.length).toBe(1);
      expect(listener.mock.calls[0]).toEqual([{ title: "foo" }]);
    });

    test("Only disposes the corresponding listener", () => {
      const fooListener = jest.fn();
      const barListener = jest.fn();

      logger.addListener("warn", fooListener);
      logger.addListener("warn", barListener)();
      logger.report("warn", "baz");

      expect(fooListener.mock.calls.length).toBe(1);
      expect(barListener.mock.calls.length).toBe(0);
    });
  });
});

test("toObj returns correct information", () => {
  const objTestLogger = new Logger(["foo", "bar"]);

  objTestLogger.report("foo", "baz");
  objTestLogger.historyLimit = 501;

  expect(objTestLogger.toObj()).toEqual({
    categories: ["foo", "bar"],
    history: [
      {
        category: "foo",
        msg: { title: "baz" }
      }
    ],
    historyLimit: 501
  });
});

test("fromObj returns an instance of itself from the object passed", () => {
  const obj = {
    categories: ["foo", "bar"],
    history: [
      {
        category: "foo",
        msg: "baz"
      }
    ],
    historyLimit: 501
  };
  const objTestLogger = Logger.fromObj(obj);

  expect(objTestLogger.hasCategory("foo")).toBeTruthy();
  expect(objTestLogger.hasCategory("bar")).toBeTruthy();
  expect(objTestLogger.history).toEqual([
    {
      category: "foo",
      msg: "baz"
    }
  ]);
  expect(objTestLogger.historyLimit).toBe(501);
});

describe("Global listeners", () => {
  test("Gets called on any known category", () => {
    const globalListener = jest.fn();

    logger.addGlobalListener(globalListener);
    logger.report("warn", "message");

    expect(globalListener.mock.calls.length).toBe(1);
  });

  test("Gets passed the category and message", () => {
    const globalListener = jest.fn();

    logger.addGlobalListener(globalListener);
    logger.report("warn", "message");

    expect(globalListener.mock.calls[0]).toEqual([
      "warn",
      { title: "message" }
    ]);
  });

  describe("Disposing", () => {
    test("addGlobalListener returns a function to dispose the corresponding listener", () => {
      const globalListener = jest.fn();
      const dispose = logger.addGlobalListener(globalListener);

      logger.report("warn", "foo");
      dispose();
      logger.report("warn", "bar");

      expect(globalListener.mock.calls.length).toBe(1);
      expect(globalListener.mock.calls[0]).toEqual(["warn", { title: "foo" }]);
    });

    test("Only disposes the corresponding listener", () => {
      const fooGlobalListener = jest.fn();
      const barGlobalListener = jest.fn();

      logger.addGlobalListener(fooGlobalListener);
      logger.addGlobalListener(barGlobalListener)();
      logger.report("warn", "baz");

      expect(fooGlobalListener.mock.calls.length).toBe(1);
      expect(barGlobalListener.mock.calls.length).toBe(0);
    });
  });
});
