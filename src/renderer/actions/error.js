import { push } from 'react-router-redux';

export function changeErrorMsg(msg) {
    return {
        type: "ERROR_MSG_CHANGE",
        payload: msg
    }
}

export function displayError(msg) {
    return dispatch => {
        dispatch(changeErrorMsg(msg));
        dispatch(push("/error"));
    }
}
