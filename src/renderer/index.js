import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { Route } from 'react-router'
import { ConnectedRouter, push } from 'react-router-redux';
import { webFrame, remote } from 'electron';

import Root from './components/Root';
import { history, configureStore } from './store/configureStore';
import { initNode } from './actions/node';
import { compileFuncs } from './lib/func'
import { displayError } from './actions/error';

// To make sure you can't zoom in
webFrame.setVisualZoomLevelLimits(1, 1);
webFrame.setLayoutZoomLevelLimits(1, 1);

const configFile = remote.require("./config");
const config = configFile.config;
const error = configFile.error;

const testNode = config.rootNode;
const store = configureStore();

if(!error.active) {
    compileFuncs(testNode);

    store.dispatch(initNode(testNode));
}

render(
    <Root store={store} history={history} />,
    document.getElementById('root')
);

if (error.active) {
    store.dispatch(displayError(error.msg));
} else {
    store.dispatch(push("/node"));
}
