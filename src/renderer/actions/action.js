import { ipcRenderer } from 'electron';

import { actionMap } from '../lib/action';

// eslint-disable-next-line import/prefer-default-export
export function runAction(action) {
    return dispatch => {
        console.log(action);
        if (!(action[0] in actionMap)) {
            // TODO
            console.log('error');
            return;
        }
        const hide = (action[2].canHide) ? () => {
            ipcRenderer.send('hide-window');
        } : () => { };
        actionMap[action[0]].run(action[1], action[2], hide, dispatch);
    };
}
