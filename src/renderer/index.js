import { webFrame, ipcRenderer } from 'electron';
import React from 'react';
import { render } from 'react-dom';
import { push } from 'react-router-redux';

import Root from './components/Root';
import { history, configureStore } from './store/configureStore';
import { initNode, loadRoot } from './actions/node';
import compileRootNode from './compileRootNode';
import compileConfig from './compileConfig';
import { log } from './actions/error';
import PluginManager from './plugin/PluginManager';
import basePlugin from '../plugins/base';
import { init, get } from './plugin/shareObject';

// To make sure you can't zoom in
webFrame.setVisualZoomLevelLimits(1, 1);
webFrame.setLayoutZoomLevelLimits(1, 1);

const { potentialError, configString, configPath } = ipcRenderer.sendSync('get-data');
const store = configureStore();
const pluginManager = new PluginManager(msg => {
    store.dispatch(log(msg));
});

init(store);

window.store = store;
window.pluginManager = pluginManager;

pluginManager.loadPlugin(basePlugin(get()));

let rootNode;

store.dispatch(push('/'));

render(
    <Root store={store} history={history} />,
    document.getElementById('root')
);

if (potentialError.active) {
    store.dispatch(log(potentialError.msg));
} else {
    let config;
    let error = false;
    try {
        config = compileConfig(configString, configPath, store);
    } catch (err) {
        store.dispatch(log(`There was an error loading config "${configPath}": ${err}`));
        error = true;
    }
    if (!error) {
        window.config = config.config;
        rootNode = compileRootNode(config.rootNode);
        if (rootNode[0]) {
            store.dispatch(log(rootNode[1].toString()));
        } else if (store.getState().routerReducer.location.pathname !== '/error') {
            store.dispatch(initNode(rootNode[1]));
            store.dispatch(push('/node'));
        }
    }
}

ipcRenderer.on('hid', () => {
    store.dispatch(loadRoot());
});

