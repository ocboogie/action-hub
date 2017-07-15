import React, { Component } from 'react';
import styled from 'styled-components';

export default class Text extends Component {
    constructor(props) {
        super(props);

        this.isTextFunc = typeof this.props.args.text === 'function';

        if (this.isTextFunc) {
            this.state = { text: '' };
        } else {
            this.state = { text: this.props.args.text };
        }
    }

    componentWillMount() {
        if (this.isTextFunc) {
            this.props.args.text(this.changeText.bind(this));
        }
    }

    changeText(text) {
        this.setState({ text });
    }

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
                <span>{this.state.text}</span>
            </Text>
        );
    }
}
