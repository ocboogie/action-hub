import React from 'react';
import { Route } from 'react-router';

import App from './components/App';
import HomePage from './components/HomePage';
import SettingsPage from './components/SettingsPage';
import ErrorPage from './components/ErrorPage';

export default function Routes() {
    return (
        <App>
            <Route exact path="/" />
            <Route exact path="/node" component={HomePage} />
            <Route exact path="/settings" component={SettingsPage} />
            <Route exact path="/error" component={ErrorPage} />
        </App>
    );
}
