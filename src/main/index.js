import { app, BrowserWindow, ipcMain } from 'electron';
import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer';

import * as path from 'path';
import * as url from 'url';

import * as config from './config';

let mainWindow;

config.init();

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: config.config.windowSize,
        height: config.config.windowSize,
        alwaysOnTop: config.config.alwaysOnTop,
        frame: true,
    });

    config.setMainWindow(mainWindow);

    mainWindow.loadURL(url.format({
        pathname: path.resolve(__dirname, '../index.html'),
        protocol: 'file:',
        slashes: true
    }));

    mainWindow.on('closed', function () {
        mainWindow = null
    });

    if (__DEV__) {
        installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS])
            .then((name) => console.log(`Added Extension:  ${name}`))
            .catch((err) => console.log('An error occurred: ', err));
    }
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});
