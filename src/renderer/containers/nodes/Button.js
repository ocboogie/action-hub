import React, { Component } from 'react';
import { connect } from 'react-redux';

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
        const style = {
            backgroundColor: buttonColor,
            outlineColor: buttonColor
        };
        return (
            <div onClick={this.handleClick} style={style} className="button">
                <span className="button-text">{this.props.args.text}</span>
            </div>
        );
    }
}

export default connect()(Button);
