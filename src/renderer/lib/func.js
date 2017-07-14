import * as path from 'path';

import * as fsp from 'fs-promise';

import deepMap from '../../utills/deepMap';
import argParser from '../../utills/argParser';
import { createNode } from './node';

const funcMap = {
    button: {
        mandatoryArgs: [
            'action',
            'runAction'
        ],
        args: {
            text: ''
        },
        creator: args => {
            return createNode(
                'text',
                {
                    text: args.text
                },
                {
                    onClick: () => {
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
    args = argParser(funcMap, type, args, () => {
        console.log('error');
    });
    return funcMap[type].creator(args);
}
