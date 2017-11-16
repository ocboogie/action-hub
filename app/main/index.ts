import { homedir } from "os";
import * as path from "path";
import * as url from "url";

// tslint:disable-next-line no-implicit-dependencies
import { app, BrowserWindow } from "electron";
import ActionHubWindow from "./ActionHubWindow";

const CONFIG_PATH = path.join(homedir(), ".action-hub.toml");

const window = new ActionHubWindow(app, CONFIG_PATH);

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
