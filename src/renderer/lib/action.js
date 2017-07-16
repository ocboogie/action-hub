import { exec } from 'child_process';

import { shell, remote } from 'electron';

import { runAction } from '../actions/action';
import { displayNode } from './../actions/node';
import argParser from '../../common/utills/argParser';

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
    },
    confirm: {
        mandatoryArgs: [
            'action'
        ],
        args: {
            msg: ''
        },
        creator(args, globalArgs) {
            return ['confirm', args, globalArgs];
        },
        run(args, globalArgs, hide, dispatch) {
            const choice = remote.dialog.showMessageBox(remote.getCurrentWindow(), {
                type: 'question',
                buttons: ['Yes', 'No'],
                title: 'Confirm',
                message: args.msg
            });
            if (choice === 0) {
                dispatch(runAction(args.action));
            }
        }
    }
};

export function createAction(type, args, globalArgs = {}) {
    args = argParser(actionMap, type, args, () => {
        console.log('error');
    });
    return actionMap[type].creator(args, Object.assign({}, defaultGlobalArgs, actionMap[type].globalArgs, globalArgs));
}
