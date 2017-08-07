import { NodeVM, VMScript } from 'vm2';

import { createNode } from './lib/node';
import { createAction } from './lib/action';
import { createPreset } from './lib/preset';
import { runAction } from './actions/action';

export default (configString, configPath, store) => {
    const sandbox = {
        createNode,
        createAction,
        createPreset,
        store,
        setTimeout,
        setInterval,
        clearTimeout,
        clearInterval,
        runAction: action => {
            store.dispatch(runAction(action));
        }
    };
    const vm = new NodeVM({
        require: {
            external: true
        },
        sandbox
    });
    const script = new VMScript(configString);
    const scriptObj = vm.run(script, configPath);
    return scriptObj;
};
