import { exec } from 'child_process';

import { shell } from 'electron';

import { displayNode } from './../actions/node';
import argParser from '../../utills/argParser';

// eslint-disable-next-line import/prefer-default-export
export const actionMap = {
    app: {
        mandatoryArgs: [
            'path'
        ],
        creator: args => {
            return ['app', args];
        },
        run: (args, hide) => {
            hide();
            exec(`"${args.path}"`);
        }
    },
    cmd: {
        mandatoryArgs: [
            'cmd'
        ],
        creator: args => {
            return ['cmd', args];
        },
        run: (args, hide) => {
            hide();
            exec(args.cmd);
        }
    },
    node: {
        mandatoryArgs: [
            'node'
        ],
        creator: args => {
            return ['node', args];
        },
        run: (args, hide, dispatch) => {
            dispatch(displayNode(args.node));
        }
    },
    url: {
        mandatoryArgs: [
            'url'
        ],
        creator: args => {
            return ['url', args];
        },
        run: (args, hide) => {
            hide();
            shell.openExternal(args.url);
        }
    }
};

export function createAction(type, args) {
    args = argParser(actionMap, type, args, () => {
        console.log('error');
    });
    return actionMap[type].creator(args);
}
