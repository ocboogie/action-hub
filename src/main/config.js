import { homedir } from 'os';
import * as vm from 'vm';
import * as path from 'path';

import * as fsp from 'fs-promise';
import * as chokidar from 'chokidar';
import * as JSONfn from 'json-fn';

import defaultConfig from './defaultConfig';

const configFileName = '.actionHub.js';
const configPath = path.resolve(homedir(), configFileName);
let mainWindow;

// eslint-disable import/no-mutable-exports
export let config;
export let rootNodeFunc;
// eslint-enable import/no-mutable-exports
export const error = { msg: '', active: false };

export function setMainWindow(window) {
    mainWindow = window;
}
function extract(script) {
    const module = { exports: {} };
    script.runInNewContext({ module });
    return module.exports;
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
    try {
        const configScript = new vm.Script(fsp.readFileSync(path, 'utf8'), { filename: configFileName, displayErrors: true });
        const configObj = extract(configScript);
        rootNodeFunc = JSONfn.stringify(configObj.rootNode);
        setConfig(configObj.config);
    } catch (err) {
        error.active = true;
        error.msg = 'There was an error loading your config: "' + err + '"';
        setConfig(null);
    }
    reloadWindow();
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
    loadConfig(configPath);
    watch(configPath);
}
