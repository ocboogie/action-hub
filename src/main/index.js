import * as path from 'path';
import * as url from 'url';

import { app, BrowserWindow, Tray, Menu, screen, globalShortcut } from 'electron';
import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer';

import * as config from './config';

let tray;
let mainWindow;

config.init();
const configObj = config.getConfig();

function toggleHide() {
    if (mainWindow.isVisible()) {
        mainWindow.hide();
        mainWindow.webContents.send('hid');
    } else {
        mainWindow.webContents.send('shown');
        const curPos = screen.getCursorScreenPoint();
        const winPos = mainWindow.getSize();
        mainWindow.setPosition(Math.round(curPos.x - (winPos[0] / 2)), Math.round(curPos.y - (winPos[1] / 2)));
        mainWindow.show();
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
        width: configObj.windowSize,
        height: configObj.windowSize,
        alwaysOnTop: configObj.alwaysOnTop,
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

    globalShortcut.register(configObj.hotkey, () => {
        toggleHide();
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    if (__DEV__) {
        installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS])
            .then(name => console.log(`Added Extension:  ${name}`))
            .catch(err => console.log('An error occurred: ', err));
    }
});

app.on('window-all-closed', () => {
    app.quit();
});
