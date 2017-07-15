import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as action from './action';
import * as node from './node';
import { createAction } from '../lib/action';
import { createNode } from '../lib/node';
import { displayError } from './error';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const exampleNode = createNode('text', { text: 'some text' });
const exampleAction = createAction('node', { node: exampleNode });

it('should run the action', () => {
    const store = mockStore({});

    store.dispatch(action.runAction(exampleAction));
    const actions = store.getActions();

    expect(actions).toEqual([
        node.loadNode(exampleNode)
    ]);
});

it('should display an error if not a recognized action type', () => {
    const store = mockStore({});
    const compareStore = mockStore({});

    const doNothingExampleAction = [].concat(exampleAction);
    doNothingExampleAction[0] = 'not a action type';

    store.dispatch(action.runAction(doNothingExampleAction));
    compareStore.dispatch(displayError(`Corrupt action: "${doNothingExampleAction[0]}" is not a action type. Full action: [${doNothingExampleAction}]`));
    const actions = store.getActions();

    expect(actions).toEqual(compareStore.getActions());
});
