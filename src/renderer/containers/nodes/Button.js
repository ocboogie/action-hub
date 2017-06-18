import React, { Component } from 'react';
import { connect } from 'react-redux';

class Button extends Component {
    render() {
        return (
            <div>
                <h1>{this.props.value.text}</h1>
            </div>
        );
    }
}

export default connect()(Button)