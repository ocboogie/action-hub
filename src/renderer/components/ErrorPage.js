import React, { Component } from 'react';
import cssModules from 'react-css-modules';

import ErrorMsg from '../containers/ErrorMsg';
import styles from './ErrorPage.styl';

class ErrorPage extends Component {
    render() {
        return (
            <div>
                <div styleName="ErrorText">Error!</div>
                <ErrorMsg />
            </div>
        );
    }
}

export default cssModules(ErrorPage, styles);
