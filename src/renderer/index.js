import { webFrame, ipcRenderer } from 'electron';
import React from 'react';
import { render } from 'react-dom';
import { push } from 'react-router-redux';

import Root from './components/Root';
import { history, configureStore } from './store/configureStore';
import { initNode, loadRoot } from './actions/node';
import compileRootNode from './compileRootNode';
import compileConfig from './compileConfig';
import displayError, { setDisptach } from './displayError';

// To make sure you can't zoom in
webFrame.setVisualZoomLevelLimits(1, 1);
webFrame.setLayoutZoomLevelLimits(1, 1);

const { potentialError, configString, configPath } = ipcRenderer.sendSync('get-data');
const store = configureStore();

let rootNode;

store.dispatch(push('/'));

setDisptach(store.dispatch);

render(
    <Root store={store} history={history} />,
    document.getElementById('root')
);

if (potentialError.active) {
    displayError(potentialError.msg);
} else {
    const config = compileConfig(configString, configPath, store);
    rootNode = compileRootNode(config.rootNode);
    if (rootNode[0]) {
        displayError(rootNode[1].toString());
    } else if (store.getState().routerReducer.location.pathname !== '/error') {
        store.dispatch(initNode(rootNode[1]));
        store.dispatch(push('/node'));
    }
}

ipcRenderer.on('hid', () => {
    store.dispatch(loadRoot());
});

