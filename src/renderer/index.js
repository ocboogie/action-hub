import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { Route } from 'react-router'
import { ConnectedRouter, push } from 'react-router-redux';
import { webFrame } from 'electron';

import Root from './components/Root';
import { history, configureStore } from './store/configureStore';
import HomePage from './components/HomePage';
import { initNode } from './actions/node';

const store = configureStore();

// To make sure you can't zoom in
webFrame.setVisualZoomLevelLimits(1, 1);
webFrame.setLayoutZoomLevelLimits(1, 1);

const testNode = {
    "type": "grid",
    "value": [
        {
            "type": "button",
            "value": {
                "type": "node",
                "text": "games",
                "value": {}
            }
        },
        {
            "type": "button",
            "value": {
                "type": "node",
                "text": "apps",
                "value": {}
            }
        }
    ]
}

store.dispatch(initNode(testNode))

render(
    <Root store={store} history={history} />,
    document.getElementById('root')
);

store.dispatch(push("/"));
