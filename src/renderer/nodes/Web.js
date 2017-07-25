import React, { Component } from 'react';
import cssModules from 'react-css-modules';

import styles from './Web.styl';

class Web extends Component {
    render() {
        return (
            <div>
                <webview src={this.props.args.url} />
            </div>
        );
    }
}

export default cssModules(Web, styles);
