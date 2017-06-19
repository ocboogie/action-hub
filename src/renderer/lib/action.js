import { exec } from "child_process";

import { displayNode } from './../actions/node';

export const actionMap = {
    "app": {
        run: args => {
            exec(`"${args.path}"`);
        }
    },
    "cmd": {
        run: args => {
            exec(args.cmd);
        }
    },
    "node": {
        run: (args, dispatch) => {
            dispatch(displayNode(args.node));
        }
    }
}
