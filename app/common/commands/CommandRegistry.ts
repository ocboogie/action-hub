import { ICommand, ICommandHandler } from "./command";

export interface ICommandRegistry {
  registerCommand(command: ICommand);
  registerCommands(commands: ICommand[]);
  createCommand(id: string, commandHandler: ICommandHandler);
  getCommand(id: string): ICommand;
  getCommands(id: string): Map<string, ICommand>;
}

export default class CommandRegistry implements ICommandRegistry {
  private commands = new Map<string, ICommand>();

  public registerCommand(command: ICommand) {
    this.commands.set(command.id, command);
  }

  public registerCommands(commands: ICommand[]) {
    commands.forEach(command => {
      this.registerCommand(command);
    });
  }

  public createCommand(id: string, commandHandler: ICommandHandler) {
    const command: ICommand = {
      id,
      handler: commandHandler
    };
    this.registerCommand(command);
  }

  public getCommand(id: string): ICommand {
    return this.commands.get(id);
  }

  public getCommands(): Map<string, ICommand> {
    return this.commands;
  }
}
