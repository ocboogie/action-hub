import { homedir } from "os";
import * as path from "path";

// tslint:disable-next-line no-implicit-dependencies
import { BrowserWindowConstructorOptions } from "electron";

import IConfig from "../types/IConfig";

const dev = process.env.NODE_ENV === "development";

export const configName = "action-hub.toml";
export const configDirPath = path.join(homedir(), "action-hub");

export const windowSettings = (
  inputConfig: IConfig
): BrowserWindowConstructorOptions => {
  return {
    height: inputConfig.windowSize,
    width: config.windowSize,
    ...windowSettings
  };
};

export const config = {
  hideWhenBlur: !dev,
  hotkey: process.platform === "darwin" ? "Cmd+Ctrl+C" : "Alt+Ctrl+C",
  showOnDock: !dev,
  windowSettings: {
    alwaysOnTop: !dev,
    backgroundColor: "#2d2d2d",
    frame: dev,
    resizable: dev
  },
  windowSize: dev ? 1000 : 500
};
