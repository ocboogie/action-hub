import React from 'react';
import { Route } from 'react-router';

import App from './components/App';
import HomePage from './components/HomePage';
import NodePage from './components/NodePage';
import SettingsPage from './components/SettingsPage';
import ErrorPage from './components/ErrorPage';

export default function Routes() {
    return (
        <App>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/node" component={NodePage} />
            <Route exact path="/settings" component={SettingsPage} />
            <Route exact path="/error" component={ErrorPage} />
        </App>
    );
}
