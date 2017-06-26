import { app, BrowserWindow, ipcMain, Tray, Menu } from 'electron';
import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer';

import * as path from 'path';
import * as url from 'url';

import * as config from './config';

let tray;
let mainWindow;

config.init();

app.on('ready', () => {

    tray = new Tray(path.resolve(__dirname, "../../assets/tray.png"));
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Reload config',
            click() { config.reloadConfig() }
        },
        {
            label: 'Reload window',
            click() { app.relaunch(); app.quit() }
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
