import Logger from "../../Logger";
import { ICommand, ICommandHandler } from "../command";
import CommandConsole from "../CommandConsole";

let commandConsole: CommandConsole;
const logger = new Logger(["error"]);

test("Create CommandConsole successfully", () => {
  commandConsole = new CommandConsole(logger);
});

const firstMockCommandHandler = jest.fn();

test("registerCommand register commands", () => {
  const commandId = "command.one";
  const command: ICommand = {
    id: commandId,
    handler: firstMockCommandHandler
  };

  commandConsole.registerCommand(command);

  expect(commandConsole.getCommand(commandId)).toBe(command);
});

describe("run function", () => {
  test("Calls commands handler and not any others", () => {
    const mockCommandHandler = jest.fn();
    const commandId = "command.two";
    const command: ICommand = {
      id: commandId,
      handler: mockCommandHandler
    };

    commandConsole.registerCommand(command);
    commandConsole.run("command.two");

    expect(firstMockCommandHandler.mock.calls.length).toBe(0);
    expect(mockCommandHandler.mock.calls.length).toBe(1);
  });

  test("Passes arguments to commands handler", () => {
    const mockCommandHandler = jest.fn();
    const commandId = "command.three";
    const command: ICommand = {
      id: commandId,
      handler: mockCommandHandler
    };

    commandConsole.registerCommand(command);
    commandConsole.run("command.three arg1 arg2");

    expect(mockCommandHandler.mock.calls[0]).toEqual(["arg1", "arg2"]);
  });

  test("Logs an error when command not found", () => {
    const loggerMockListener = jest.fn();

    logger.addListener("error", loggerMockListener);
    commandConsole.run("not.a.real.command");
    expect(loggerMockListener.mock.calls[0][0]).toBe(
      'Could not found command "not.a.real.command"'
    );
  });

  test("Logs an error when command handler throws an error", () => {
    const errorMsg = "Oh no!";
    const mockErrorThrower = () => {
      throw new Error(errorMsg);
    };
    const loggerMockListener = jest.fn();
    const commandId = "command.four";
    const command: ICommand = {
      id: commandId,
      handler: mockErrorThrower
    };

    logger.addListener("error", loggerMockListener);
    commandConsole.registerCommand(command);
    commandConsole.run("command.four");
    expect(loggerMockListener.mock.calls[0][0]).toBe(
      `There was an error running command "command.four": Error: ${errorMsg}`
    );
  });
});
