import { JSONfn } from 'jsonfn';

import { createNode } from './lib/node';
import { createAction } from './lib/action';
import { compileFunc } from './lib/func';

export default rootNodeFunc => {
    console.log(createNode('button', { action: {} }));
    try {
        const rootNode = JSONfn.parse(rootNodeFunc)(createNode, createAction, compileFunc);
        return [false, rootNode];
    } catch (err) {
        return [true, 'There was an error loading your config: "' + err + '"'];
    }
};
