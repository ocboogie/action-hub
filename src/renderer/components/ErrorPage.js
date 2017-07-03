import React, { Component } from 'react';
import styled from 'styled-components';

import ErrorMsg from '../containers/ErrorMsg';

export default class ErrorPage extends Component {
    render() {
        const ErrorText = styled.h1`
            font-size: 5em;
            text-align: center;
            color: #e62747;
        `;
        return (
            <div>
                <ErrorText>Error!</ErrorText>
                <ErrorMsg />
            </div>
        );
    }
}
