import { createNode } from './lib/node';
import { createAction } from './lib/action';
import { createPreset } from './lib/preset';
import { runAction } from './actions/action';

export default (rootNodeFunc, store) => {
    try {
        const rootNode = rootNodeFunc(createNode, createAction, createPreset, action => {
            store.dispatch(runAction(action));
        });
        return [false, rootNode];
    } catch (err) {
        return [true, 'There was a runtime error loading your config: "' + err + '"'];
    }
};
