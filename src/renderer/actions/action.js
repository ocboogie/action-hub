import { ipcRenderer } from 'electron';

import { log } from './error';

// eslint-disable-next-line import/prefer-default-export
export function runAction(action) {
    return dispatch => {
        if (Array.isArray(action)) {
            for (const oneAction of action) {
                dispatch(runAction(oneAction));
            }
            return;
        }

        const hide = (action.commonArgs.canHide) ? () => {
            ipcRenderer.send('hide-window');
        } : () => { };
        const found = window.pluginManager.findRegistrable('action', action.type);
        if (found !== undefined) {
            found.run(action.args, action.commonArgs, hide, dispatch);
            return;
        }
        dispatch(log(`Could not find action type "${action.type}"`));
    };
}
