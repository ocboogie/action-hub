import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import { remote } from 'electron';

import ErrorMsg from '../containers/ErrorMsg';
import Button from './Button';
import styles from './ErrorPage.styl';

class ErrorPage extends Component {
    constructor(props) {
        super(props);
        this.handleReloadButtonClick = this.handleReloadButtonClick.bind(this);
    }

    handleReloadButtonClick() {
        remote.getCurrentWebContents().reload();
    }

    render() {
        return (
            <div styleName="ErrorPage">
                <div styleName="errorText">Error!</div>
                <ErrorMsg />
                <div styleName="reloadButton">
                    <Button onClick={this.handleReloadButtonClick}>Reload</Button>
                </div>
            </div>
        );
    }
}

export default cssModules(ErrorPage, styles);
