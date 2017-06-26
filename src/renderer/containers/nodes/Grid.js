import React, { Component } from 'react';
import { connect } from 'react-redux';

import NodeContainer from '../NodeContainer';

class Grid extends Component {
    render() {
        const renderedNodes = [];
        const nodes = this.props.value;
        const gridSize = (100 * 1.0 / Math.ceil(Math.sqrt(nodes.length))).toString() + '%';
        const style = {
            width: gridSize,
            height: gridSize,
            float: 'left'
        };

        nodes.forEach(node => {
            renderedNodes.push(<div className="grid-node-container" style={style} key={node.id}><NodeContainer node={node} /></div>);
        });
        return (
            <div className="grid">
                {renderedNodes}
            </div>
        );
    }
}

export default connect()(Grid);
