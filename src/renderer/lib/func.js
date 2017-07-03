import * as path from 'path';

import * as fsp from 'fs-promise';

import apply2all from '../../utills/apply2all';
import findAndReplaceInObj from '../../utills/findAndReplaceInObj';

const funcs = {
    /* eslint-disable func-name-matching */
    dir2actions: {
        mandatoryArgs: [
            'path'
        ],
        args: {
            recursive: true,
            flat: true,
            hideExtension: true,
            showHidden: false,
            container: null
        },
        func: function dir2actions(args) {
            let actions = [];
            let files = fsp.readdirSync(args.path);
            if (!args.showHidden) {
                files = files.filter(item => !(/(^|\/)\.[^/.]/g).test(item));
            }
            for (const file of files) {
                const pathOfFile = path.join(args.path, file);
                if (fsp.statSync(pathOfFile).isDirectory() && path.extname(file) !== '.app') {
                    if (args.recursive) {
                        if (args.flat) {
                            actions = actions.concat(dir2actions({ ...args, path: pathOfFile }));
                        } else {
                            // TODO
                        }
                    }
                } else {
                    const fileName = (args.hideExtension) ? path.basename(pathOfFile).replace(/\.[^/.]+$/, '') : path.basename(pathOfFile);
                    const action = ['app', { path: pathOfFile }];
                    if (args.container) {
                        actions.push(apply2all(args.container, value => {
                            if (value === '<action>') {
                                return action;
                            } else if (value === '<text>') {
                                return fileName;
                            }
                        }));
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
    return findAndReplaceInObj(obj, obj => (obj.func === true), obj => {
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
        return funcs[obj.funcName].func(Object.assign(funcs[obj.funcName].args, obj.args));
    });
}
