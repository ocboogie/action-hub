import React, { Component } from 'react';
import styled from 'styled-components';

export default class Text extends Component {
    render() {
        const backgroundColor = '#e74c3c';
        const Text = styled.div`
            background-color: ${backgroundColor};
            outline-color: ${backgroundColor};
            width: 100%;
            height: 100%;
            display: table;
            text-align: center;
            outline-style: solid;
            outline-width: 1px;
            > span {
                display: table-cell;
                vertical-align: middle;
            }
        `;
        return (
            <Text>
                <span>{this.props.args.text}</span>
            </Text>
        );
    }
}
