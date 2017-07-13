import { exec } from 'child_process';

import { shell } from 'electron';

import { displayNode } from './../actions/node';

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
    if (!(type in actionMap)) {
        // TODO
        console.log('error');
        return;
    }
    for (const value of actionMap[type].mandatoryArgs) {
        if (args[value] === undefined) {
            // TODO
            console.log('error');
            return;
        }
    }
    return actionMap[type].creator(Object.assign({}, actionMap[type].args, args));
}
