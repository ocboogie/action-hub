import React, { Component } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../theme';

export default class App extends Component {
    render() {
        const Style = styled.div`
            font-family: "roboto";
            background-color: #2d2d2d;
        `;
        return (
            <ThemeProvider theme={theme}>
                <Style>
                    {this.props.children}
                </Style>
            </ThemeProvider>
        );
    }
}
