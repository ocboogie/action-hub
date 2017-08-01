import { ipcRenderer } from 'electron';

import { actionMap } from '../lib/action';
import displayError from '../displayError';

// eslint-disable-next-line import/prefer-default-export
export function runAction(action) {
    return dispatch => {
        if (Array.isArray(action)) {
            for (const oneAction of action) {
                dispatch(runAction(oneAction));
            }
            return;
        }
        if (!(action.type in actionMap)) {
            displayError(`Corrupt action: "${action.type}" is not a action type. Full action: [${action}]`);
            return;
        }
        const hide = (action.commonArgs.canHide) ? () => {
            ipcRenderer.send('hide-window');
        } : () => { };
        actionMap[action.type].run(action.args, action.commonArgs, hide, dispatch);
    };
}
