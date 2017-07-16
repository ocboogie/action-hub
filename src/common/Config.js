import * as vm from 'vm';
import { basename } from 'path';

import * as fsp from 'fs-promise';
import * as chokidar from 'chokidar';
import * as JSONfn from 'json-fn';

export default class Config {
    constructor(configPath, defaultConfig, displayError, deactivateError) {
        this.configPath = configPath;
        this.displayError = displayError;
        this.deactivateError = deactivateError;
        this.defaultConfig = defaultConfig;

        if (!fsp.existsSync(configPath)) {
            displayError(`No config found. Create a config at "${configPath}"`);
            return;
        }
        this.loadConfig(configPath);
        this.watch(configPath);
    }

    setConfig(config = {}) {
        this.config = Object.assign({}, this.defaultConfig, config);
    }

    setWindow(_window) {
        this.window = _window;
    }

    extract(script) {
        const module = { exports: {} };
        script.runInNewContext({ module });
        return module.exports;
    }

    watch() {
        this.watcher = chokidar.watch(this.configPath).on('change', () => {
            this.deactivateError();
            this.loadConfig(this.configPath);
        });
    }

    loadConfig(path) {
        try {
            this.configScript = new vm.Script(fsp.readFileSync(path, 'utf8'), { filename: basename(this.configPath), displayErrors: true });
        } catch (err) {
            this.displayError(`There was an error loading your config: "${err}"`);
            this.setConfig(null);
            this.reloadWindow();
            return;
        }
        this.scriptObj = this.extract(this.configScript);
        this.scriptString = JSONfn.stringify(this.scriptObj);
        this.setConfig(this.scriptObj.config);
        this.reloadWindow();
    }

    reloadWindow() {
        if (this.window) {
            this.window.reload();
        }
    }

    destroy() {
        this.watcher.close();
    }
}
