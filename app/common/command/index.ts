export type ICommandHandler = (...args: string[]) => void;

export interface ICommand {
  readonly id: string;
  handler: ICommandHandler;
}
