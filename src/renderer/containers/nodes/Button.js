import React, { Component } from 'react';
import { connect } from 'react-redux';

import { runAction } from '../../actions/action';

class Button extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.props.dispatch(runAction(this.props.value));
    }

    render() {
        return (
            <div onClick={this.handleClick} className="button">
                <span className="button-text">{this.props.value.text}</span>
            </div>
        );
    }
}

export default connect()(Button)
