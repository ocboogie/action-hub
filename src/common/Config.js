import { NodeVM, VMScript } from 'vm2';
import * as fsp from 'fs-promise';
import * as chokidar from 'chokidar';
import * as JSONfn from 'json-fn';

export default class Config {
    constructor(configPath, defaultConfig, displayError, deactivateError) {
        this.configPath = configPath;
        this.displayError = displayError;
        this.deactivateError = deactivateError;
        this.defaultConfig = defaultConfig;
        this.vm = new NodeVM({
            require: {
                external: true
            }
        });

        if (!fsp.existsSync(configPath)) {
            displayError(`No config found. Create a config at "${configPath}"`);
            return;
        }
        this.setupConfig(configPath);
    }

    setConfig(config = {}) {
        this.config = Object.assign({}, this.defaultConfig, config);
    }

    setWindow(_window) {
        this.window = _window;
    }

    watch(configPath) {
        if (this.watcher) {
            this.watcher.close();
        }
        this.watcher = chokidar.watch(configPath).on('change', () => {
            this.deactivateError();
            this.loadConfig(configPath);
        });
    }

    setupConfig(path) {
        this.watch(path);
        this.loadConfig(path);
    }

    loadConfig(path) {
        try {
            this.configScript = new VMScript(fsp.readFileSync(path, 'utf8'));
            this.scriptObj = this.vm.run(this.configScript, path);
        } catch (err) {
            this.displayError(`There was an error loading config ${this.configPath}: "${err}"`);
            this.setConfig(null);
            this.reloadWindow();
            return;
        }
        this.scriptString = JSONfn.stringify(this.scriptObj);
        this.setConfig(this.scriptObj.config);
        if (this.config.configPath) {
            this.setupConfig(this.config.configPath);
            return;
        }
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
