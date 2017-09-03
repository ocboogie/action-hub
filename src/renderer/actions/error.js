import { push } from 'react-router-redux';

export function changeError(error) {
    return {
        type: 'ERROR_CHANGE',
        payload: error
    };
}

export function log(msg, type = 2) {
    return (dispatch, getState) => {
        switch (type) {
            case (0):
                console.info(msg);
                return;
            case (1):
                console.warn(msg);
                if (!window.config.displayWarnings) {
                    return;
                }
                return;
            case (2):
                console.error(msg);
                break;
        }
        if (getState().error.active !== true) {
            dispatch(changeError({ msg, active: true }));
            dispatch(push('/error'));
        }
    };
}
