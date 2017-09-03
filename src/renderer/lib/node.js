import React from 'react';

import NodeContainer from '../containers/NodeContainer';

const cache = Object.create(null);

export function getCachedNode(node) {
    let CachedNode;
    if (cache[node.uuid] === undefined) {
        CachedNode = (<NodeContainer node={node} />);
        cache[node.uuid] = CachedNode;
    } else {
        CachedNode = cache[node.uuid];
    }
    return CachedNode;
}

export function findRoot(node) {
    if (node.parent === undefined) {
        return node;
    }
    return findRoot(node.parent);
}
