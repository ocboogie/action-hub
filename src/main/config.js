import { homedir } from 'os';
import * as path from 'path';

import * as fsp from 'fs-promise';
import * as chokidar from 'chokidar';
import { parse } from 'jsonlint';

import defaultConfig from './defaultConfig';

const configPath = path.resolve(homedir(), '.actionHub.json');
let mainWindow;
let config;

export const error = { msg: '', active: false };

export function setMainWindow(window) {
    mainWindow = window;
}

function setConfig(_config) {
    _config = _config || {};
    config = { ...defaultConfig, ..._config };
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
            return false;
        }

        // TODO error checking
        setConfig(cfg);
    } else {
        setConfig(null);
    }
    if (mainWindow) {
        mainWindow.reload();
    }
    return true;
}

function watch(path) {
    chokidar.watch(path).on('change', () => {
        error.msg = '';
        error.active = false;
        loadConfig(path);
    });
}

export function getConfig() {
    return config;
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
