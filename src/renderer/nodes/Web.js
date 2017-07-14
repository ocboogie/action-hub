import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

class Web extends Component {
    render() {
        const Web = styled.div`
            width: 100%;
            height: 100%;
            > webview {
                width: 100%;
                height: 100%;
            }
        `;

        return (
            <Web>
                <webview src={this.props.args.url} />
            </Web>
        );
    }
}

export default connect()(Web);
