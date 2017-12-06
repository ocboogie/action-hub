import * as path from "path";
import * as url from "url";

// tslint:disable-next-line no-implicit-dependencies
import { app } from "electron";
import * as fs from "fs-extra";

import ActionHubWindow from "./ActionHubWindow";
import { configDirPath, configName } from "./defaults";

fs.emptyDirSync(configDirPath);
const window = new ActionHubWindow(app, path.join(configDirPath, configName));

app.on("ready", () => {
  window.initializeWindow();

  if (process.env.NODE_ENV === "development") {
    window.debug();
  }

  window.window.loadURL(
    url.format(
      process.env.HOT
        ? {
            hostname: "localhost",
            port: process.env.PORT || 8080,
            protocol: "http"
          }
        : {
            pathname: path.join(__dirname, "index.html"),
            protocol: "file:",
            slashes: true
          }
    )
  );
});

app.on("window-all-closed", () => {
  app.quit();
});
