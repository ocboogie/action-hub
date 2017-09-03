import React, { Component } from 'react';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';

import styles from './ErrorMsg.styl';

class ErrorMsg extends Component {
    render() {
        const msg = (this.props.error.msg instanceof Error) ? this.props.error.msg.message : this.props.error.msg;
        return (
            <div styleName="ErrorMsg">
                <pre>{msg}</pre>
            </div>
        );
    }
}

const mapStateToProps = state => ({ error: state.error });

export default connect(mapStateToProps)(cssModules(ErrorMsg, styles));
