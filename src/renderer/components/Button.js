import React, { Component } from 'react';
import styled from 'styled-components';
import Color from 'color';

export default class Button extends Component {
    render() {
        const Button = styled.button`
            color: ${props => props.theme.textColor};
            background-color: ${props => props.theme.btnColor};
            padding-top: 19px;
            padding-bottom: 19px;
            padding-right: 26px;
            padding-left: 26px;
            font-size: 18px;
            line-height: 1.33333;
            border-radius: 6px;
            border: none;
            &:hover {
                background-color: ${props => new Color(props.theme.btnColor).lighten(0.1).string()};
                color: ${props => props.theme.textColor};
            }
            &:active {
                background-color: ${props => new Color(props.theme.btnColor).darken(0.05).string()};
            }
            &:focus, &:active:focus {
                outline: 0 none;
            }
        `;
        return (
            <Button className={this.props.className}>
                {this.props.children}
            </Button>
        );
    }
}
