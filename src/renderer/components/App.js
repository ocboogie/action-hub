import React, { Component } from 'react';
import cssModules from 'react-css-modules';

import styles from './App.styl';

class App extends Component {
    render() {
        return (
            <div styleName="App">
                {this.props.children}
            </div>
        );
    }
}

export default cssModules(App, styles);
