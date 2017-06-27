import { exec } from 'child_process';

import { shell } from 'electron';

import { displayNode } from './../actions/node';

// eslint-disable-next-line import/prefer-default-export
export const actionMap = {
    app: {
        run: (args, hide) => {
            hide();
            exec(`"${args.path}"`);
        }
    },
    cmd: {
        run: (args, hide) => {
            hide();
            exec(args.cmd);
        }
    },
    node: {
        run: (args, hide, dispatch) => {
            dispatch(displayNode(args.node));
        }
    },
    url: {
        run: (args, hide) => {
            hide();
            shell.openExternal(args.url);
        }
    }
};
