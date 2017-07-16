import * as path from 'path';
import * as url from 'url';
import { homedir } from 'os';

import { app, BrowserWindow, Tray, Menu, screen, globalShortcut, ipcMain } from 'electron';

import defaultConfig from './defaultConfig';
import Config from '../common/Config';
import PotentialError from '../common/PotentialError';

const configFileName = '.actionHub.js';
const configPath = path.resolve(homedir(), configFileName);

let tray;
let mainWindow;
const potentialError = new PotentialError();
const config = new Config(configPath, defaultConfig, potentialError.activate.bind(potentialError), potentialError.deactivate.bind(potentialError));

function hide() {
    mainWindow.hide();
    mainWindow.webContents.send('hid');
}

function showOnCur() {
    mainWindow.webContents.send('shown');
    const curPos = screen.getCursorScreenPoint();
    const winPos = mainWindow.getSize();
    mainWindow.setPosition(Math.round(curPos.x - (winPos[0] / 2)), Math.round(curPos.y - (winPos[1] / 2)));
    mainWindow.show();
}

function toggleHide() {
    if (mainWindow.isVisible()) {
        hide();
    } else {
        showOnCur();
    }
}

app.on('ready', () => {
    tray = new Tray(path.resolve(__dirname, '../assets/tray.png'));
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Reload config',
            click() {
                config.reloadConfig();
            }
        },
        {
            label: 'Reload window',
            click() {
                app.relaunch();
                app.quit();
            }
        },
        {
            role: 'quit'
        }
    ]);
    tray.setToolTip('Action hub');
    tray.setContextMenu(contextMenu);

    mainWindow = new BrowserWindow({
        width: config.config.windowSize,
        height: config.config.windowSize,
        ...config.config.windowSettings
    });

    config.setWindow(mainWindow);

    if (process.platform === 'darwin') {
        app.dock.hide();
    } else {
        mainWindow.setSkipTaskbar(true);
    }

    mainWindow.loadURL(url.format({
        pathname: path.resolve(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    globalShortcut.register(config.config.hotkey, () => {
        toggleHide();
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    mainWindow.on('blur', () => {
        if (config.config.hideWhenLeaveFocus) {
            hide();
        }
    });

    if (process.env.NODE_ENV === 'development') {
        mainWindow.webContents.openDevTools();
        const electronDevtools = require('electron-devtools-installer');
        const installExtension = electronDevtools.default;
        const { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } = electronDevtools;
        installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS])
            .then(name => console.log(`Added Extension:  ${name}`))
            .catch(err => console.log('An error occurred: ', err));
    }
});

app.on('window-all-closed', () => {
    app.quit();
});

ipcMain.on('hide-window', () => {
    hide();
});

ipcMain.on('show-window', () => {
    showOnCur();
});

ipcMain.on('get-data', event => {
    event.returnValue = { potentialError: potentialError.toObj(), configScriptString: config.scriptString };
});
