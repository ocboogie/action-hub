import { push } from 'react-router-redux';

export function changeError(error) {
    return {
        type: 'ERROR_CHANGE',
        payload: error
    };
}

export function displayError(msg) {
    return dispatch => {
        dispatch(changeError({ msg, active: true }));
        dispatch(push('/error'));
    };
}
