
import Grid from '../nodes/Grid';
import Text from '../nodes/Text';
import Web from '../nodes/Web';

import argParser from '../../common/utills/argParser';

export function findRoot(node) {
    if (node.parent === undefined) {
        return node;
    }
    return findRoot(node.parent);
}

// eslint-disable-next-line import/prefer-default-export
export const nodeMap = {
    grid: {
        mandatoryArgs: [
            'nodes'
        ],
        creator(args, reactArgs) {
            return { type: 'grid', args, reactArgs };
        },
        element: Grid
    },
    text: {
        args: {
            text: ''
        },
        creator(args, reactArgs) {
            return { type: 'text', args, reactArgs };
        },
        element: Text
    },
    web: {
        mandatoryArgs: [
            'url'
        ],
        creator(args, reactArgs) {
            return { type: 'web', args, reactArgs };
        },
        element: Web
    }
};

export function createNode(type, args, reactArgs = {}) {
    args = argParser(nodeMap, type, args, () => {
        console.log('error');
    });
    return nodeMap[type].creator(args, reactArgs);
}
