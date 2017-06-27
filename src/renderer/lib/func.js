import * as path from 'path';

import * as fsp from 'fs-promise';

import replaceAll from '../../utills/replaceAll';

const funcs = {
    /* eslint-disable func-name-matching */
    dir2actions: {
        mandatoryArgs: [
            'path'
        ],
        args: {
            recursive: true,
            flat: true,
            hideExtension: true
        },
        func: function dir2actions(args) {
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
                    const fileName = (args.hideExtension) ? path.basename(pathOfFile).replace(/\.[^/.]+$/, '') : path.basename(pathOfFile);
                    const action = { type: 'app', value: pathOfFile, text: fileName };
                    if (args.container) {
                        actions.push(replaceAll(args.container, '<action>', action));
                    } else {
                        actions.push(action);
                    }
                }
            }
            return actions;
        }
    }
    /* eslint-enable func-name-matching */
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
            for (const value of funcs[obj.funcName].mandatoryArgs) {
                if (obj.args[value] === undefined) {
                    // TODO
                    console.log('error');
                    return;
                }
            }
            return funcs[obj.funcName].func(Object.assign(obj.args, funcs[obj.funcName].args));
        }
    }
}
