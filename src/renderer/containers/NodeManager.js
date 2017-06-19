import React, { Component } from 'react';
import { connect } from 'react-redux';

import { nodeMap } from '../lib/node';
import NodeContainer from './NodeContainer';
import { backNode } from '../actions/node';

class NodeManager extends Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.dispatch(backNode());
    }

    render() {
        return (
            <div className="node-manager" onContextMenu={this.handleClick}>
                <NodeContainer node={this.props.node} />
            </div>
        );
    }
}

const mapStateToProps = (state) => (state)

export default connect(mapStateToProps)(NodeManager)
