import React, { Component } from 'react';
import styled from 'styled-components';

export default class Text extends Component {
    constructor(props) {
        super(props);

        this.isTextObj = typeof this.props.args.text === 'function';

        if (this.isTextObj) {
            this.state = { text: '' };
        } else {
            this.state = { text: this.props.args.text };
        }
    }

    componentWillMount() {
        if (this.isTextObj) {
            this.unmountFunc = this.props.args.text(this.changeText.bind(this));
        }
    }

    componentWillUnmount() {
        if (this.isTextObj && this.unmountFunc) {
            this.unmountFunc();
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
            > div {
                display: table-cell;
                vertical-align: middle;
            }
        `;
        return (
            /* eslint-disable react/no-array-index-key */
            <Text>
                <div>
                    {this.state.text.split('\n').map((item, key) => {
                        return (
                            <span key={key}>
                                {item}
                                <br />
                            </span>
                        );
                    })}
                </div>
            </Text>
            /* eslint-enable react/no-array-index-key */
        );
    }
}
