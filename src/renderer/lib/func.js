import * as path from 'path';

import * as fsp from 'fs-promise';

import deepMap from '../../utills/deepMap';

const funcMap = {
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
        creator: function creator(args) {
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
                            actions = actions.concat(creator({ ...args, path: pathOfFile }));
                        } else {
                            // TODO
                        }
                    }
                } else {
                    const fileName = (args.hideExtension) ? path.basename(pathOfFile).replace(/\.[^/.]+$/, '') : path.basename(pathOfFile);
                    const action = ['app', { path: pathOfFile }];
                    if (args.container) {
                        actions.push(deepMap(args.container, value => {
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
};

// eslint-disable-next-line import/prefer-default-export
export function compileFunc(type, args) {
    if (!(type in funcMap)) {
        // TODO
        console.log('error');
        return;
    }
    for (const value of funcMap[type].mandatoryArgs) {
        if (args[value] === undefined) {
            // TODO
            console.log('error');
            return;
        }
    }
    return funcMap[type].creator(Object.assign({}, funcMap[type].args, args));
}
