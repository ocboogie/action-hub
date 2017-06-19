import React, { Component } from 'react';
import { connect } from 'react-redux';

class Button extends Component {
    render() {
        return (
            <div className="button">
                <span className="button-text">{this.props.value.text}</span>
            </div>
        );
    }
}

export default connect()(Button)
