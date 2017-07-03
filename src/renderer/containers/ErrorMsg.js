import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

class ErrorMsg extends Component {
    render() {
        const ErrorMsgContainer = styled.div`
            border-radius: 10px;
            padding: 15px;
            margin-top: 0px;
            margin-left: 10%;
            margin-right: 10%;
            background-color: #4fdbe4;

            > pre {
                font-family: "roboto";
                white-space: pre-wrap;
                font-size: 0.8em;
            }
        `;

        return (
            <ErrorMsgContainer>
                <pre>{this.props.error.msg || ''}</pre>
            </ErrorMsgContainer >
        );
    }
}

const mapStateToProps = state => ({ error: state.error });

export default connect(mapStateToProps)(ErrorMsg);
