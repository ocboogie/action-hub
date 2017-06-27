const platform = process.platform;

let hotkey;

if (platform === 'darwin') {
    hotkey = 'Cmd+Ctrl+C';
} else {
    hotkey = 'Super+Ctrl+C';
}

export default {
    windowSize: 500,
    alwaysOnTop: true,
    hideWhenLeaveFocus: true,
    hotkey
};
