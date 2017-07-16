import * as path from 'path';

import * as fsp from 'fs-promise';

import deepMap from '../../common/utills/deepMap';
import argParser from '../../common/utills/argParser';
import { createNode } from './node';
import { createAction } from './action';

const prefixMap = {
    button: {
        mandatoryArgs: [
            'action',
            'runAction'
        ],
        args: {
            text: ''
        },
        creator(args) {
            return createNode(
                'text',
                {
                    text: args.text
                },
                {
                    onClick() {
                        args.runAction(args.action);
                    },
                    style: {
                        cursor: 'pointer'
                    }
                }
            );
        }
    },
    dir2actions: {
        mandatoryArgs: [
            'path'
        ],
        args: {
            recursive: true,
            flat: false,
            hideExtension: true,
            showHidden: false,
            container: null,
            folderCreator: actions => {
                return createAction('node', { node: createNode('grid', { nodes: actions }) });
            }
        },
        creator: function creator(args) {
            let actions = [];
            let files = fsp.readdirSync(args.path);
            if (!args.showHidden) {
                files = files.filter(item => !(/(^|\/)\.[^/.]/g).test(item));
            }
            for (const file of files) {
                const pathOfFile = path.join(args.path, file);
                const fileName = (args.hideExtension) ? path.basename(pathOfFile).replace(/\.[^/.]+$/, '') : path.basename(pathOfFile);
                if (fsp.statSync(pathOfFile).isDirectory() && path.extname(file) !== '.app') {
                    if (args.recursive) {
                        const actionInFolder = creator({ ...args, path: pathOfFile });
                        if (args.flat) {
                            actions = actions.concat(actionInFolder);
                        } else if (typeof args.container === 'function') {
                            actions.push(args.container(args.folderCreator(actionInFolder), fileName));
                        } else {
                            actions.push(deepMap(args.container, value => {
                                if (value === '<action>') {
                                    return args.folderCreator(actionInFolder);
                                } else if (value === '<text>') {
                                    return fileName;
                                }
                            }));
                        }
                    }
                } else {
                    const action = createAction('app', { path: pathOfFile });
                    if (args.container) {
                        if (typeof args.container === 'function') {
                            actions.push(args.container(action, fileName));
                        } else {
                            actions.push(deepMap(args.container, value => {
                                if (value === '<action>') {
                                    return action;
                                } else if (value === '<text>') {
                                    return fileName;
                                }
                            }));
                        }
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
export function createPrefix(type, args) {
    args = argParser(prefixMap, type, args, () => {
        console.log('error');
    });
    return prefixMap[type].creator(args);
}
