import React, { Component } from 'react';
import { connect } from 'react-redux';

import { nodeMap } from '../lib/node';

class NodeContainer extends Component {
    render() {
        if (!(this.props.node.type in nodeMap)) {
            return (<div />);
        }
        const Node = nodeMap[this.props.node.type].element;
        return (
            <div {...this.props.node.reactArgs}>
                <Node args={this.props.node.args} />
            </div>
        );
    }
}

export default connect()(NodeContainer);
