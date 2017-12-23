// tslint:disable-next-line no-implicit-dependencies
import { ipcRenderer } from "electron";
import * as ReactDom from "react-dom";

import Logger from "../common/Logger";
import createLogger from "./createLogger";
import root from "./root";

const { config, logger: loggerObj } = ipcRenderer.sendSync("get-data");

const logger = createLogger(loggerObj);

declare global {
  // tslint:disable-next-line interface-name
  interface Window {
    logger: Logger;
    config: object;
  }
}

window.logger = logger;
window.config = config;

ReactDom.render(root, document.getElementById("root"));
