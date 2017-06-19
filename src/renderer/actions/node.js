export function initNode(node) {
    return {
        type: "NODE_INIT",
        payload: node
    }
}

export function loadNode(node) {
    return {
        type: "NODE_LOAD",
        payload: node
    }
}

export function displayNode(node) {
    return (dispatch, getState) => {
        node.parent = getState().node;
        dispatch(loadNode(node));
    }
}
