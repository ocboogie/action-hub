import React, { Component } from 'react';
import { connect } from 'react-redux';

import { runAction } from '../../actions/action';

class Button extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.dispatch(runAction(this.props.value));
    }

    render() {
        const style = {
            backgroundColor: '#e74c3c'
        };
        return (
            <div onClick={this.handleClick} style={style} className="button">
                <span className="button-text">{this.props.value.text}</span>
            </div>
        );
    }
}

export default connect()(Button);
