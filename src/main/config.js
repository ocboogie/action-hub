import { homedir } from 'os';
import * as path from 'path';

import * as fsp from 'fs-promise';
import * as chokidar from 'chokidar';
import { parse } from 'json5';

import defaultConfig from './defaultConfig';

const configPath = path.resolve(homedir(), '.actionHub.json5');
let mainWindow;

// eslint-disable-next-line import/no-mutable-exports
export let config;

export const error = { msg: '', active: false };

export function setMainWindow(window) {
    mainWindow = window;
}

function setConfig(_config) {
    _config = _config || {};
    config = Object.assign(defaultConfig, _config);
}

function reloadWindow() {
    if (mainWindow) {
        mainWindow.reload();
    }
}

function loadConfig(path) {
    const json = fsp.readFileSync(path, 'utf8');

    if (json) {
        let cfg;
        try {
            cfg = parse(json);
        } catch (err) {
            error.active = true;
            error.msg = 'JSON error: ' + err;
            reloadWindow();
            return false;
        }

        // TODO error checking
        setConfig(cfg);
    } else {
        setConfig(null);
    }
    reloadWindow();
    return true;
}

function watch(path) {
    chokidar.watch(path).on('change', () => {
        error.msg = '';
        error.active = false;
        loadConfig(path);
    });
}

export function reloadConfig(path = configPath) {
    loadConfig(path);
}

export function init() {
    if (!fsp.existsSync(configPath)) {
        fsp.writeFileSync(configPath, '');
    }
    if (!loadConfig(configPath)) {
        setConfig(defaultConfig);
    }
    watch(configPath);
}
