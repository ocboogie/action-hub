import React, { Component } from 'react';

const style = {
    fontFamily: "roboto"
};

export default class App extends Component {
    render() {
        return (
            <div style={style}>
                {this.props.children}
            </div>
        );
    }
}
