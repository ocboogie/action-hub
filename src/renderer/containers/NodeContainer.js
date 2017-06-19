import React, { Component } from 'react';
import { connect } from 'react-redux';

import { nodeMap } from '../lib/node';

class NodeContainer extends Component {
    render() {
        let Node = nodeMap[this.props.node.type].element
        return (
            <div className="node-container">
                <Node value={this.props.node.value} />
            </div >
        );
    }
}

export default connect()(NodeContainer);