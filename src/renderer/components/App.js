import React, { Component } from 'react';
import styled from 'styled-components';

export default class App extends Component {
    render() {
        const Style = styled.div`
            font-family: "roboto";
            background-color: #2d2d2d;
        `;
        return (
            <Style>
                {this.props.children}
            </Style>
        );
    }
}
