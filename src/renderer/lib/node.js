
import Button from '../containers/nodes/Button';
import Grid from '../containers/nodes/Grid';
import Text from '../containers/nodes/Text';
import Web from '../containers/nodes/Web';

import argParser from '../../utills/argParser';

export function findRoot(node) {
    if (node.parent === undefined) {
        return node;
    }
    return findRoot(node.parent);
}

// eslint-disable-next-line import/prefer-default-export
export const nodeMap = {
    button: {
        mandatoryArgs: [
            'action'
        ],
        args: {
            text: ''
        },
        creator: args => {
            return ['button', args];
        },
        element: Button
    },
    grid: {
        mandatoryArgs: [
            'nodes'
        ],
        creator: args => {
            return ['grid', args];
        },
        element: Grid
    },
    text: {
        args: {
            text: ''
        },
        creator: args => {
            return ['text', args];
        },
        element: Text
    },
    web: {
        mandatoryArgs: [
            'url'
        ],
        creator: args => {
            return ['web', args];
        },
        element: Web
    }
};

export function createNode(type, args) {
    args = argParser(nodeMap, type, args, () => {
        console.log('error');
    });
    return nodeMap[type].creator(args);
}
