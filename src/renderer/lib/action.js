import { exec } from 'child_process';

import { shell, remote } from 'electron';

import { runAction } from '../actions/action';
import { displayError } from '../actions/error';
import { displayNode } from './../actions/node';
import argParser from '../../common/utills/argParser';

export const defaultCommonArgs = {
    canHide: true
};

// eslint-disable-next-line import/prefer-default-export
export const actionMap = {
    app: {
        mandatoryArgs: [
            'path'
        ],
        creator(args, commonArgs) {
            return { type: 'app', args, commonArgs };
        },
        run(args, commonArgs, hide) {
            hide();
            exec(`"${args.path}"`);
        }
    },
    cmd: {
        mandatoryArgs: [
            'cmd'
        ],
        creator(args, commonArgs) {
            return { type: 'cmd', args, commonArgs };
        },
        run(args, commonArgs, hide) {
            hide();
            exec(args.cmd);
        }
    },
    node: {
        mandatoryArgs: [
            'node'
        ],
        creator(args, commonArgs) {
            return { type: 'node', args, commonArgs };
        },
        run(args, commonArgs, hide, dispatch) {
            dispatch(displayNode(args.node));
        }
    },
    url: {
        mandatoryArgs: [
            'url'
        ],
        creator(args, commonArgs) {
            return { type: 'url', args, commonArgs };
        },
        run(args, commonArgs, hide) {
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
        creator(args, commonArgs) {
            return { type: 'confirm', args, commonArgs };
        },
        run(args, commonArgs, hide, dispatch) {
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
    },
    func: {
        mandatoryArgs: [
            'func'
        ],
        args: {
            args: []
        },
        creator(args, commonArgs) {
            return { type: 'func', args, commonArgs };
        },
        run(args, commonArgs, hide, dispatch) {
            try {
                args.func(...args.args);
            } catch (e) {
                dispatch(displayError(`An error occurred while running your function: ${e}`));
            }
        }
    }
};

export function createAction(type, args, commonArgs = {}) {
    args = argParser(actionMap, type, args, () => {
        console.log('error');
    });
    return actionMap[type].creator(args, Object.assign({}, defaultCommonArgs, actionMap[type].commonArgs, commonArgs));
}
