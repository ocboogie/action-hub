import React, { Component } from 'react';
import { connect } from 'react-redux';

import { nodeMap } from '../lib/node';
import NodeContainer from './NodeContainer';

class NodeManager extends Component {
    render() {
        return (
            <div>
                <NodeContainer node={this.props.node} />
            </div>
        );
    }
}

const mapStateToProps = (state) => (state)

export default connect(mapStateToProps)(NodeManager)