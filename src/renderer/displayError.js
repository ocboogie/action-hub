import { displayError } from './actions/error';

let dispatch;

export function setDisptach(_dispatch) {
    dispatch = _dispatch;
}

export default function (msg) {
    dispatch(displayError(msg));
}
