import { actionMap } from '../lib/action';

// eslint-disable-next-line import/prefer-default-export
export function runAction(action) {
    return dispatch => {
        if (!(action.type in actionMap)) {
            // TODO
            console.log('error');
            return;
        }
        actionMap[action.type].run(action.args, dispatch);
    };
}
