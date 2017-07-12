const platform = process.platform;

let hotkey;

if (platform === 'darwin') {
    hotkey = 'Cmd+Ctrl+C';
} else {
    hotkey = 'Super+Ctrl+C';
}

const dev = process.env.NODE_ENV === 'development';

export default {
    windowSize: dev ? 1000 : 500,
    hideWhenLeaveFocus: !dev,
    windowSettings: {
        alwaysOnTop: !dev,
        frame: dev,
        resizable: dev,
        backgroundColor: '#2d2d2d'
    },
    hotkey
};
