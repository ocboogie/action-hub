import React, { Component } from 'react';
import { connect } from 'react-redux';

import { nodeMap } from '../lib/node';

class NodeContainer extends Component {
    render() {
        if (!(this.props.node[0] in nodeMap)) {
            return (<div />);
        }
        const Node = nodeMap[this.props.node[0]].element;
        return (
            <div>
                <Node args={this.props.node[1]} />
            </div>
        );
    }
}

export default connect()(NodeContainer);
