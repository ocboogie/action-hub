import * as path from 'path';

import * as fsp from 'fs-promise';

export default (shareObject, plugin) => {
    return new shareObject.Preset('dir2actions',
        {
            mandatoryArgs: [
                'path'
            ],
            args: {
                recursive: true,
                flat: true,
                hideExtension: true,
                showHidden: false,
                container: null,
                folderCreator: actions => {
                    return plugin.findRegistrable('action', 'node').create(
                        {
                            node: plugin.findRegistrable('node', 'grid').create({ nodes: actions })
                        }
                    );
                }
            }
        },
        function creator(args) {
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
                        }
                    }
                } else {
                    const action = plugin.findRegistrable('action', 'app').create({ path: pathOfFile });
                    if (args.container) {
                        if (typeof args.container === 'function') {
                            actions.push(args.container(action, fileName));
                        }
                    } else {
                        actions.push(action);
                    }
                }
            }
            return actions;
        }
    );
};
