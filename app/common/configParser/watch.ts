import chokidar from "chokidar";

import parseFile from "./parseFile";

export default function(configPath: string, listener: (object) => undefined) {
  chokidar.watch(configPath).on("change", () => {
    parseFile(configPath).then(config => {
      listener(config);
    });
  });
}
