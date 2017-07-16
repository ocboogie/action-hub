
import Grid from '../nodes/Grid';
import Text from '../nodes/Text';
import Web from '../nodes/Web';

import argParser from '../../common/utills/argParser';

export function findRoot(node) {
    if (node[3] === undefined) {
        return node;
    }
    return findRoot(node[3]);
}

// eslint-disable-next-line import/prefer-default-export
export const nodeMap = {
    grid: {
        mandatoryArgs: [
            'nodes'
        ],
        creator(args, reactArgs) {
            return ['grid', args, reactArgs];
        },
        element: Grid
    },
    text: {
        args: {
            text: ''
        },
        creator(args, reactArgs) {
            return ['text', args, reactArgs];
        },
        element: Text
    },
    web: {
        mandatoryArgs: [
            'url'
        ],
        creator(args, reactArgs) {
            return ['web', args, reactArgs];
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
