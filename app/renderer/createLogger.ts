// tslint:disable-next-line no-implicit-dependencies
import { ipcRenderer } from "electron";
import * as toastify from "react-toastify";

import Logger, { ILoggerObj, IMessage } from "../common/Logger";

export default (loggerObj: ILoggerObj): Logger => {
  const logger = Logger.fromObj(loggerObj);

  logger.addGlobalListener((category: string, msg: IMessage) => {
    Logger.log2Console(category, msg);
    toastify.toast(
      msg.title +
        (msg.description
          ? ". Look at the console for more info ctrl+shift+i"
          : ""),
      {
        type: category as toastify.ToastType
      }
    );
    ipcRenderer.send("clean-history");
  });

  // Catch up
  logger.history.forEach(logged => {
    logger.report(logged.category, logged.msg.title, logged.msg.description);
  });

  ipcRenderer.on(
    "log",
    (event: Electron.Event, category: string, msg: IMessage) => {
      logger.report(category, msg.title, msg.description);
    }
  );

  return logger;
};
