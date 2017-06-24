import React, { Component } from 'react';
import { connect } from 'react-redux';

import { nodeMap } from '../lib/node';
import NodeContainer from './NodeContainer';
import { backNode } from '../actions/node';

class NodeManager extends Component {

    constructor(props) {
        super(props);

        this.handleRightClick = this.handleRightClick.bind(this);
    }

    handleRightClick() {
        this.props.dispatch(backNode());
    }

    render() {
        return (
            <div className="node-manager" onContextMenu={this.handleRightClick}>
                <NodeContainer node={this.props.node} />
            </div>
        );
    }
}

const mapStateToProps = (state) => (state)

export default connect(mapStateToProps)(NodeManager)
