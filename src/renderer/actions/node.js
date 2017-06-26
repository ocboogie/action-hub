import { findRoot } from '../lib/node';

export function initNode(node) {
    return {
        type: 'NODE_INIT',
        payload: node
    };
}

export function loadNode(node) {
    return {
        type: 'NODE_LOAD',
        payload: node
    };
}

export function backNode() {
    return (dispatch, getState) => {
        const parent = getState().node.parent;
        if (parent) {
            dispatch(loadNode(parent));
        }
    };
}

export function loadRoot() {
    return (dispatch, getState) => {
        dispatch(loadNode(findRoot(getState().node)));
    };
}

export function displayNode(node) {
    return (dispatch, getState) => {
        node.parent = getState().node;
        dispatch(loadNode(node));
    };
}
