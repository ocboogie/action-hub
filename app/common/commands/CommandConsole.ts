import { parse as shellSplit } from "shell-quote";

import Logger from "../Logger";
import CommandRegistry from "./CommandRegistry";

export default class CommandConsole extends CommandRegistry {
  public static input2args(input: string): string[] {
    return shellSplit(input);
  }

  private logger: Logger;

  constructor(logger?: Logger) {
    super();
    this.logger = logger;
  }

  public run(input: string) {
    const args = CommandConsole.input2args(input);
    const commandId = args[0];
    const command = super.getCommand(commandId);
    if (!command) {
      if (this.logger) {
        this.logger.report("error", `Could not found command "${commandId}"`);
      }
      return;
    }
    try {
      command.handler(...args.slice(1));
    } catch (e) {
      if (this.logger) {
        this.logger.report(
          "error",
          `There was an error running command "${commandId}": ${e}`
        );
      }
    }
  }
}
