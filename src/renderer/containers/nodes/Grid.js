import React, { Component } from 'react';
import { connect } from 'react-redux';

import NodeContainer from '../NodeContainer';

class Grid extends Component {
    render() {
        const nodes = this.props.args.nodes;
        const gridSize = (100 * 1.0 / Math.ceil(Math.sqrt(nodes.length))).toString() + '%';
        const style = {
            width: gridSize,
            height: gridSize,
            float: 'left'
        };

        const renderedNodes = nodes.map((node, key) =>
            // We won't be mutating these so performance will be fine
            // eslint-disable-next-line react/no-array-index-key
            (<div className="grid-node-container" style={style} key={key}><NodeContainer node={node} /></div>)
        );
        return (
            <div className="grid">
                {renderedNodes}
            </div>
        );
    }
}

export default connect()(Grid);
