import { actionMap } from '../lib/action';

export function runAction(action) {
    return dispatch => {
        if (!(action.type in actionMap)) {
            // TODO
            console.log("error")
            return
        }
        actionMap[action.type].run(action.args, dispatch)
    }
}
