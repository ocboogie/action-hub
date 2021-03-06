// tslint:disable-next-line no-implicit-dependencies
import { BrowserWindowConstructorOptions } from "electron";

export interface IConfig {
  [key: string]: boolean | number | string | object | null;
  hideWhenBlur: boolean;
  hotkey: string;
  windowSettings: BrowserWindowConstructorOptions;
  windowSize: number;
}
