import { homedir } from 'os';
import * as fsp from 'fs-promise';
import * as path from 'path';

import { dialog } from 'electron';
import * as chokidar from 'chokidar';
import { parse } from 'jsonlint';

import defaultConfig from './defaultConfig';

const configPath = path.resolve(homedir(), '.actionHub.json');
let mainWindow;

export let config;
export const error = { msg: "", active: false };

export function setMainWindow(window) {
    mainWindow = window;
}

function setConfig(_config) {
    _config = _config || {};
    config = { ...defaultConfig, ..._config };
}

function loadConfig(path) {
    let json = fsp.readFileSync(path, 'utf8');
    if (json) {
        try {
            var cfg = parse(json);
        } catch (err) {
            error.active = true;
            error.msg = "JSON error: " + err;
            return false;
        }

        // TODO error checking
        setConfig(cfg);
        return true;
    } else {
        setConfig(null);
        return true;
    }
}

function watch(path) {
    chokidar.watch(path).on('change', () => {
        error.msg = "";
        error.active = false;
        loadConfig(path);
        if (mainWindow) {
            mainWindow.reload();
        }
    });

}


export function init() {
    if (!fsp.existsSync(configPath)) {
        fsp.writeFileSync(configPath, "")
    }
    if (!loadConfig(configPath)) {
        setConfig(defaultConfig);
    }
    watch(configPath);
}
