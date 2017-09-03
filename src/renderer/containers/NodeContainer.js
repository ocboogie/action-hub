import React, { Component } from 'react';
import { connect } from 'react-redux';

class NodeContainer extends Component {
    render() {
        const found = window.pluginManager.findRegistrable('node', this.props.node.type);
        if (found === undefined) {
            return (<div />);
        }
        const Node = found.element;
        return (
            <div {...this.props.node.reactArgs}>
                <Node args={this.props.node.args} />
            </div>
        );
    }
}

export default connect()(NodeContainer);
