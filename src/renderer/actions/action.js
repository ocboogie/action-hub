import { ipcRenderer } from 'electron';

import { actionMap } from '../lib/action';
import displayError from '../displayError';

// eslint-disable-next-line import/prefer-default-export
export function runAction(action) {
    return dispatch => {
        if (!(action[0] in actionMap)) {
            displayError(`Corrupt action: "${action[0]}" is not a action type. Full action: [${action}]`);
            return;
        }
        const hide = (action[2].canHide) ? () => {
            ipcRenderer.send('hide-window');
        } : () => { };
        actionMap[action[0]].run(action[1], action[2], hide, dispatch);
    };
}
