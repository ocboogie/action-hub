import React, { Component } from 'react';
import ErrorMsg from '../containers/ErrorMsg';

export default class SettingsPage extends Component {
    render() {
        return (
            <div>
                <h1>Error!</h1>
                <ErrorMsg />
            </div>
        );
    }
}