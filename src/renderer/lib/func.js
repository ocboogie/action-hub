import * as path from 'path';

import * as fsp from 'fs-promise';

import replaceAll from '../../utills/replaceAll';

const funcs = {
    dir2actions: function dir2actions(args) {
        if (args.path === null) {
            // TODO
            console.log('error');
            return;
        }
        args.recursive = args.recursive || true;
        args.flat = args.flat || true;

        let actions = [];
        const files = fsp.readdirSync(args.path);
        for (const file of files) {
            const pathOfFile = path.join(args.path, file);
            if (fsp.statSync(pathOfFile).isDirectory()) {
                if (args.recursive) {
                    if (args.flat) {
                        actions = actions.concat(dir2actions({ ...args, path: pathOfFile }));
                    } else {
                        // TODO
                    }
                }
            } else {
                const action = { type: 'app', value: pathOfFile, text: path.basename(pathOfFile) };
                if (args.container) {
                    actions.push(replaceAll(args.container, '<action>', action));
                } else {
                    actions.push(action);
                }
            }
        }
        return actions;
    }
};

// eslint-disable-next-line import/prefer-default-export
export function compileFuncs(obj) {
    for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'object') {
            const replacement = compileFuncs(value);
            if (replacement) {
                obj[key] = replacement;
            }
        } else if (obj.func === true) {
            if (!(obj.funcName in funcs)) {
                // TODO
                console.log('error');
                return;
            }
            return funcs[obj.funcName](obj.args || {});
        }
    }
}
