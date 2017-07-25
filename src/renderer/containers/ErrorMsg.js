import React, { Component } from 'react';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';

import styles from './ErrorMsg.styl';

class ErrorMsg extends Component {
    render() {
        return (
            <div styleName="ErrorMsg">
                <pre>{this.props.error.msg || ''}</pre>
            </div>
        );
    }
}

const mapStateToProps = state => ({ error: state.error });

export default connect(mapStateToProps)(cssModules(ErrorMsg, styles));
