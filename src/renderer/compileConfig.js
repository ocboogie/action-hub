import { NodeVM, VMScript } from 'vm2';

import { runAction } from './actions/action';
import { create } from './lib/plugin';

export default (configString, configPath, store) => {
    const sandbox = {
        create,
        store,
        setTimeout,
        setInterval,
        clearTimeout,
        clearInterval,
        runAction: action => {
            store.dispatch(runAction(action));
        },
        dev: process.env.NODE_ENV === 'development'
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
