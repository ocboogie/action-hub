import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { runAction } from '../../actions/action';

class Button extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.dispatch(runAction(this.props.args.action));
    }

    render() {
        const buttonColor = '#e74c3c';
        const Button = styled.div`
            background-color: ${buttonColor};
            outline-color: ${buttonColor};
            width: 100%;
            height: 100%;
            display: table;
            text-align: center;
            cursor: pointer;
            outline-style: solid;
            outline-width: 1px;
            > span {
                display: table-cell;
                vertical-align: middle;
            }
        `;
        return (
            <Button onClick={this.handleClick}>
                <span className="button-text">{this.props.args.text}</span>
            </Button>
        );
    }
}

export default connect()(Button);
