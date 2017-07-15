import * as JSONfn from 'json-fn';

import { createNode } from './lib/node';
import { createAction } from './lib/action';
import { createPrefix } from './lib/prefix';
import { runAction } from './actions/action';

export default (rootNodeFunc, store) => {
    try {
        const rootNode = JSONfn.parse(rootNodeFunc)(createNode, createAction, createPrefix, action => {
            store.dispatch(runAction(action));
        });
        return [false, rootNode];
    } catch (err) {
        return [true, 'There was an error loading your config: "' + err + '"'];
    }
};
