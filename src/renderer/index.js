import { webFrame, ipcRenderer } from 'electron';
import React from 'react';
import { render } from 'react-dom';
import { push } from 'react-router-redux';

import Root from './components/Root';
import { history, configureStore } from './store/configureStore';
import { initNode, loadRoot } from './actions/node';
import compileRootNode from './compileRootNode';
import { displayError } from './actions/error';

// To make sure you can't zoom in
webFrame.setVisualZoomLevelLimits(1, 1);
webFrame.setLayoutZoomLevelLimits(1, 1);

const { error, rootNodeFunc } = ipcRenderer.sendSync('get-data');
let rootNode;
const store = configureStore();

store.dispatch(push('/'));

render(
    <Root store={store} history={history} />,
    document.getElementById('root')
);

if (error.active) {
    console.log(error);
    store.dispatch(displayError(error.msg));
} else {
    rootNode = compileRootNode(rootNodeFunc);
    if (rootNode[0]) {
        store.dispatch(displayError(rootNode[1].toString()));
    } else {
        store.dispatch(initNode(rootNode[1]));
        store.dispatch(push('/node'));
    }
}

ipcRenderer.on('hid', () => {
    store.dispatch(loadRoot());
});

