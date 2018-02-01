import { ICommand } from "../";
import CommandRegistry from "../CommandRegistry";

let commandRegistry: CommandRegistry;

test("Create CommandRegistry successfully", () => {
  commandRegistry = new CommandRegistry();
});

test("createCommand creates a command and adds it to the registry", () => {
  const commandId = "command.one";

  commandRegistry.createCommand(commandId, () => undefined);

  expect(commandRegistry.getCommand(commandId).id).toBe(commandId);
});

test("registerCommand adds a command to the registry", () => {
  const commandId = "command.two";

  commandRegistry.registerCommand({
    handler: () => undefined,
    id: commandId
  });

  expect(commandRegistry.getCommand(commandId).id).toBe(commandId);
});

test("registerCommands adds multiple commands to the registry", () => {
  const thirdCommandId = "command.three";
  const forthCommandId = "command.four";

  commandRegistry.registerCommands([
    {
      handler: () => undefined,
      id: thirdCommandId
    },
    {
      handler: () => undefined,
      id: forthCommandId
    }
  ]);

  expect(commandRegistry.getCommand(thirdCommandId).id).toBe(thirdCommandId);
  expect(commandRegistry.getCommand(forthCommandId).id).toBe(forthCommandId);
});

test("getCommand retrieves the command with that id", () => {
  const commandId = "command.five";
  const command: ICommand = {
    id: commandId,
    handler: () => undefined
  };

  commandRegistry.registerCommand(command);

  expect(commandRegistry.getCommand(commandId)).toBe(command);
});

test("getCommands retrieves all the commands", () => {
  const commands = commandRegistry.getCommands();
  const commandId = "command.six";
  const command: ICommand = {
    id: commandId,
    handler: () => undefined
  };

  commandRegistry.registerCommand(command);

  expect(commands.size).toBe(6);
  expect(commands.get(commandId)).toBe(command);
});
