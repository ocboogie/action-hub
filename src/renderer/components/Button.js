import React, { Component } from 'react';
import cssModules from 'react-css-modules';

import styles from './Button.styl';

class Button extends Component {
    render() {
        return (
            <div styleName="Button">
                {this.props.children}
            </div>
        );
    }
}

export default cssModules(Button, styles);
