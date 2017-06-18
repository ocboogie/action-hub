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
