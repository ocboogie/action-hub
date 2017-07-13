import * as JSONfn from 'json-fn';

import { createNode } from './lib/node';
import { createAction } from './lib/action';
import { compileFunc } from './lib/func';

export default rootNodeFunc => {
    try {
        const rootNode = JSONfn.parse(rootNodeFunc)(createNode, createAction, compileFunc);
        return [false, rootNode];
    } catch (err) {
        return [true, 'There was an error loading your config: "' + err + '"'];
    }
};
