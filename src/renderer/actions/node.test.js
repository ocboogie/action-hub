import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as node from './node';
import { createNode } from '../lib/node';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const exampleNode = createNode('web', { url: 'a url' });
exampleNode.parent = createNode('text', { text: 'parent 1' });
exampleNode.parent.parent = createNode('text', { text: 'parent 2' });

it('should create an action to init a node', () => {
    const expectedAction = { type: 'NODE_INIT', payload: exampleNode };

    expect(node.initNode(exampleNode)).toEqual(expectedAction);
});

it('should create an action to load a node', () => {
    const expectedAction = { type: 'NODE_LOAD', payload: exampleNode };

    expect(node.loadNode(exampleNode)).toEqual(expectedAction);
});

describe('backNode function', () => {
    it('should go back', () => {
        const store = mockStore({ node: exampleNode });

        store.dispatch(node.backNode());
        const actions = store.getActions();

        expect(actions).toEqual([
            node.loadNode(exampleNode.parent)
        ]);
    });
    it('should do nothing if parent is undefined', () => {
        const store = mockStore({ node: exampleNode.parent.parent });

        store.dispatch(node.backNode());
        const actions = store.getActions();

        expect(actions).toEqual([]);
    });
});

it('should load the root node', () => {
    const store = mockStore({ node: exampleNode });

    store.dispatch(node.loadRoot());
    const actions = store.getActions();

    expect(actions).toEqual([
        node.loadNode(exampleNode.parent.parent)
    ]);
});

it('should load a node and make the current node the parent', () => {
    const store = mockStore({ node: exampleNode.parent });

    store.dispatch(node.displayNode(exampleNode.slice(0, 3)));
    const actions = store.getActions();

    expect(actions).toEqual([
        node.loadNode(exampleNode)
    ]);
});
