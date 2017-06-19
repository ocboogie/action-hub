import * as fsp from 'fs-promise'
import * as path from 'path';

const funcs = {
    "dir2actions": function dir2actions(args) {
        if (args.path == null) {
            // TODO
            console.log("error");
            return;
        }
        args.recursive = args.recursive || true;
        args.flat = args.flat || true;

        let actions = [];
        let files = fsp.readdirSync(args.path);
        for (let file of files) {
            let pathOfFile = path.join(args.path, file);
            if (fsp.statSync(pathOfFile).isDirectory()) {
                if (args.recursive) {
                    if (args.flat) {
                        actions = actions.concat(dir2actions({ ...args, path: pathOfFile }));
                    } else {
                        // TODO
                    }
                }
            } else {
                actions.push({ type: "app", value: pathOfFile, text: path.basename(pathOfFile) })
            }
        }
        return actions;
    }
}

export function compileFuncs(obj) {
    for (let [key, value] of Object.entries(obj)) {
        if (typeof value === "object") {
            let replacement = compileFuncs(value);
            if (replacement) {
                obj[key] = replacement;
            }
        } else {
            if (obj.func === true) {
                if (!(obj.funcName in funcs)) {
                    // TODO
                    console.log("error")
                    return;
                }
                return funcs[obj.funcName](obj.args || {});
            }
        }
    }
}
