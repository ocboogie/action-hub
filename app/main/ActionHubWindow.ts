import * as chokidar from "chokidar";
// tslint:disable-next-line no-implicit-dependencies
import { App, BrowserWindow, globalShortcut, ipcMain, screen } from "electron";
import { existsSync } from "fs-extra";
import { defaultsDeep } from "lodash";

import updateWindowOptions from "electron-update-window-options";
import { IConfig } from "../common/config";
import parseFile from "../common/config/parseFile";
import Logger from "../common/Logger";
import * as defaults from "./defaults";

export default class ActionHubWindow {
  public configPath: string;
  public window: BrowserWindow;
  public config: IConfig;
  public watcher: chokidar.FSWatcher;
  public app: App;
  public logger: Logger;

  constructor(app: App, configPath: string, logger: Logger) {
    this.app = app;
    this.logger = logger;
    this.loadConfig(configPath, true);
    this.registerEvents();
    try {
      this.initializeWatcher();
    } catch (err) {
      this.logger.report(
        "error",
        "There was an error watching your config",
        err.toString()
      );
    }
  }

  public loadConfig(configPath: string, initial: boolean = false) {
    if (!existsSync(configPath)) {
      this.logger.report(
        "warn",
        `Could not find the config at "${configPath}"`
      );
      this.processConfig();
      return;
    }
    let config: IConfig;

    let successfullyLoaded = this.configSafeRun(() => {
      config = parseFile(configPath) as IConfig;
    });
    this.configPath = configPath;
    this.processConfig(config);
    successfullyLoaded = this.configSafeRun(() => {
      if (this.window) {
        updateWindowOptions(this.window, defaults.windowSettings(this.config));
      }
    });
    if (!initial && successfullyLoaded) {
      this.logger.report("success", "Successfully loaded your config");
    }
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

    this.registerLoggerWithWindow();
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
    ipcMain.on("clean-history", () => {
      this.logger.history = [];
    });
    ipcMain.on("get-data", (event: Electron.Event) => {
      event.returnValue = {
        config: this.config,
        configPath: this.configPath,
        logger: this.logger.toObj()
      };
    });
  }

  private configSafeRun(func: () => void): boolean {
    try {
      func();
    } catch (err) {
      this.logger.report(
        "error",
        "There was an error loading your config",
        err.toString()
      );
      return false;
    }
    return true;
  }

  private initializeWatcher() {
    this.watcher = chokidar
      .watch(this.configPath, { ignoreInitial: true })
      .on("change", () => {
        this.loadConfig(this.configPath);
      });
  }

  private registerLoggerWithWindow() {
    this.logger.addGlobalListener((category, msg) =>
      this.window.webContents.send("log", category, msg)
    );
  }

  private processConfig(config?: IConfig) {
    this.config = defaultsDeep({}, config, defaults.config);
  }
}
