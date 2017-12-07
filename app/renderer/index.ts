// tslint:disable-next-line no-implicit-dependencies
import { ipcRenderer } from "electron";

import * as ReactDom from "react-dom";

import Logger from "../common/Logger";
import root from "./root";

const { config, configPath, logger: loggerObj } = ipcRenderer.sendSync(
  "get-data"
);

const logger = Logger.fromObj(loggerObj);

logger.addGlobalListener((category: string, msg: string) => {
  console.log(`${category}: ${msg}`);
});

// Catch up
logger.history.forEach(logged => {
  logger.report(logged.category, logged.msg);
});

// Once caught up clean history
ipcRenderer.send("clean-history")

ipcRenderer.on(
  "log",
  (event: Electron.Event, category: string, msg: string) => {
    logger.report(category, msg);
  }
);

ReactDom.render(root, document.getElementById("root"));
