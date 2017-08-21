import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getCachedNode } from '../lib/node';

class Grid extends Component {
    render() {
        const nodes = this.props.args.nodes;
        const gridSize = (100 / Math.ceil(Math.sqrt(nodes.length))).toString() + '%';

        const GridNodeContainer = {
            width: gridSize,
            height: gridSize,
            float: 'left'
        };

        const renderedNodes = nodes.map(node => {
            return (<div style={GridNodeContainer} key={node.uuid}>{getCachedNode(node)}</div>);
        });
        return (
            <div>
                {renderedNodes}
            </div>
        );
    }
}

export default connect()(Grid);
