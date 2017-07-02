import React, { Component } from 'react';
import { connect } from 'react-redux';

class Web extends Component {
    render() {
        const fill = {
            width: '100%',
            height: '100%'
        };
        return (
            <div style={fill} className="web">
                <webview style={fill} src={this.props.args.url} />
            </div>
        );
    }
}

export default connect()(Web);
