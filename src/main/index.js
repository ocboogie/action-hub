import * as path from 'path';
import * as url from 'url';

import { app, BrowserWindow, Tray, Menu, screen, globalShortcut, ipcMain } from 'electron';

import * as config from './config';

let tray;
let mainWindow;

config.init();

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
    tray = new Tray(path.resolve(__dirname, '../../assets/tray.png'));
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
        alwaysOnTop: config.config.alwaysOnTop,
        frame: false
    });

    config.setMainWindow(mainWindow);

    if (process.platform === 'darwin') {
        app.dock.hide();
    } else {
        mainWindow.setSkipTaskbar(true);
    }

    mainWindow.loadURL(url.format({
        pathname: path.resolve(__dirname, '../index.html'),
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

    if (__DEV__) {
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
    mainWindow.hide();
});

ipcMain.on('show-window', () => {
    mainWindow.show();
});
