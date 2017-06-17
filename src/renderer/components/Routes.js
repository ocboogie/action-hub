import React from 'react';
import { Route } from 'react-router'

import App from './App';
import HomePage from './HomePage';
import SettingsPage from './SettingsPage';

export default function Routes({ }) {
    return (
        <App>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/settings" component={SettingsPage} />
        </App>
    )
}
