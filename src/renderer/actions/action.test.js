import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as action from './action';
import * as node from './node';
import { createAction } from '../lib/action';
import { createNode } from '../lib/node';
import { displayError } from './error';
import { setDisptach } from '../displayError';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const exampleNode = createNode('text', { text: 'some text' });
const exampleAction = createAction('node', { node: exampleNode });

it('should run the action', () => {
    const store = mockStore({});
    setDisptach(store.dispatch);

    store.dispatch(action.runAction(exampleAction));
    const actions = store.getActions();

    expect(actions).toEqual([
        node.loadNode(exampleNode)
    ]);
});

it('should display an error if not a recognized action type', () => {
    const store = mockStore({});
    const compareStore = mockStore({});
    setDisptach(store.dispatch);

    const doNothingExampleAction = Object.assign({}, exampleAction);
    doNothingExampleAction.type = 'not a action type';

    store.dispatch(action.runAction(doNothingExampleAction));
    compareStore.dispatch(displayError(`Corrupt action: "${doNothingExampleAction.type}" is not a action type. Full action: [${doNothingExampleAction}]`));
    const actions = store.getActions();

    expect(actions).toEqual(compareStore.getActions());
});
