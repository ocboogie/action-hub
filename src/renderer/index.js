import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { Route } from 'react-router'
import { ConnectedRouter, push } from 'react-router-redux';

import Root from './components/Root';
import { history, configureStore } from './store/configureStore';
import HomePage from './components/HomePage';

const store = configureStore();

render(
    <Root store={store} history={history}/>,
    document.getElementById('root')
);

store.dispatch(push("/"));