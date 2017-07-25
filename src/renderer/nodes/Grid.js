import React, { Component } from 'react';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';

import styles from './Grid.styl';
import NodeContainer from '../containers/NodeContainer';
import { cache } from '../lib/node';

class Grid extends Component {
    render() {
        const nodes = this.props.args.nodes;
        const gridSize = (100 * 1.0 / Math.ceil(Math.sqrt(nodes.length))).toString() + '%';

        const GridNodeContainer = {
            width: gridSize,
            height: gridSize,
            float: 'left'
        };

        const renderedNodes = nodes.map(node => {
            let CachedNode;
            if (cache[node.uuid] === undefined) {
                CachedNode = (<NodeContainer node={node} />);
                cache[node.uuid] = CachedNode;
            } else {
                CachedNode = cache[node.uuid];
            }
            return (<div style={GridNodeContainer} key={node.uuid}>{CachedNode}</div>);
        });
        return (
            <div styleName="Grid">
                {renderedNodes}
            </div>
        );
    }
}

export default connect()(cssModules(Grid, styles));
