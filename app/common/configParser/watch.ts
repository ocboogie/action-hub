import * as chokidar from "chokidar";

import parseFile from "./parseFile";

export default function(
  configPath: string,
  listener: (config: object) => void
) {
  chokidar.watch(configPath).on("change", () => {
    listener(parseFile(configPath));
  });
}
