import * as chokidar from "chokidar";
// tslint:disable-next-line no-implicit-dependencies
import { App, BrowserWindow, globalShortcut, ipcMain, screen } from "electron";
import { existsSync } from "fs-extra";

import * as configParser from "../common/configParser";
import IConfig from "../types/IConfig";
import * as defaults from "./defaults";

export default class ActionHubWindow {
  public configPath: string;
  public window: BrowserWindow;
  public config: IConfig;
  public error: Error;
  public watcher: chokidar.FSWatcher;
  public app: App;

  constructor(app: App, configPath: string) {
    this.app = app;
    this.loadConfig(configPath);
    try {
      this.initializeWatcher();
    } catch (err) {
      this.error = new Error(`There was an error watching your config: ${err}`);
    }
  }

  public loadConfig(configPath: string) {
    this.error = undefined;
    if (!existsSync(configPath)) {
      this.error = new Error(`Could not find the config at "${configPath}"`);
      this.config = defaults.config;
      return;
    }
    let config: IConfig;
    try {
      config = configParser.parseFile(configPath) as IConfig;
    } catch (err) {
      this.error = new Error(`There was an error loading your config: ${err}`);
    }
    this.configPath = configPath;
    this.processConfig(config);
  }

  public loadURL(url: string) {
    if (this.window) {
      this.window.loadURL(url);
    }
  }

  public showOnCur() {
    if (this.window) {
      this.window.webContents.send("shown");
      const curPos = screen.getCursorScreenPoint();
      const winPos = this.window.getSize();
      this.window.setPosition(
        Math.round(curPos.x - winPos[0] / 2),
        Math.round(curPos.y - winPos[1] / 2)
      );
      this.window.show();
    }
  }

  public hide() {
    if (this.window) {
      this.window.hide();
      this.window.webContents.send("hid");
    }
  }

  public toggleWindow() {
    if (this.window) {
      if (this.window.isVisible()) {
        this.hide();
      } else {
        this.showOnCur();
      }
    }
  }

  public debug() {
    if (this.window) {
      this.window.webContents.openDevTools();
    }
  }

  public initializeWindow() {
    this.window = new BrowserWindow(defaults.windowSettings(this.config));

    if (this.config.showOnDock) {
      if (process.platform === "darwin") {
        this.app.dock.hide();
      } else {
        this.window.setSkipTaskbar(true);
      }
    }

    this.window.on("blur", () => {
      if (this.config.hideWhenBlur) {
        this.hide();
      }
    });

    this.registerShortcut();
  }

  private registerShortcut() {
    globalShortcut.register(this.config.hotkey, () => {
      this.toggleWindow();
    });
  }

  private registerEvents() {
    ipcMain.on("hide-window", this.hide);
    ipcMain.on("show-window", this.showOnCur);
    ipcMain.on("get-data", () => {
      return {
        config: this.config,
        configPath: this.configPath,
        error: this.error
      };
    });
  }

  private initializeWatcher() {
    this.watcher = chokidar
      .watch(this.configPath, { ignoreInitial: true })
      .on("change", () => {
        this.loadConfig(this.configPath);
      });
  }

  private processConfig(config?: IConfig) {
    this.config = { ...defaults.config, ...config };
  }
}
