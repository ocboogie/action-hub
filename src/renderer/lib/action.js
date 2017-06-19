import { exec } from "child_process";

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

        }
    }
}
