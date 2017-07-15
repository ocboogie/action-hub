import { exec } from 'child_process';

import { shell } from 'electron';

import { displayNode } from './../actions/node';
import argParser from '../../utills/argParser';

export const defaultGlobalArgs = {
    canHide: true
};

// eslint-disable-next-line import/prefer-default-export
export const actionMap = {
    app: {
        mandatoryArgs: [
            'path'
        ],
        creator(args, globalArgs) {
            return ['app', args, globalArgs];
        },
        run(args, globalArgs, hide) {
            hide();
            exec(`"${args.path}"`);
        }
    },
    cmd: {
        mandatoryArgs: [
            'cmd'
        ],
        creator(args, globalArgs) {
            return ['cmd', args, globalArgs];
        },
        run(args, globalArgs, hide) {
            hide();
            exec(args.cmd);
        }
    },
    node: {
        mandatoryArgs: [
            'node'
        ],
        creator(args, globalArgs) {
            return ['node', args, globalArgs];
        },
        run(args, globalArgs, hide, dispatch) {
            dispatch(displayNode(args.node));
        }
    },
    url: {
        mandatoryArgs: [
            'url'
        ],
        creator(args, globalArgs) {
            return ['url', args, globalArgs];
        },
        run(args, globalArgs, hide) {
            hide();
            shell.openExternal(args.url);
        }
    }
};

export function createAction(type, args, globalArgs = {}) {
    args = argParser(actionMap, type, args, () => {
        console.log('error');
    });
    return actionMap[type].creator(args, Object.assign({}, defaultGlobalArgs, actionMap[type].globalArgs, globalArgs));
}
