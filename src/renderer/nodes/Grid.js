import React, { Component } from 'react';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';

import styles from './Grid.styl';
import NodeContainer from '../containers/NodeContainer';

class Grid extends Component {
    render() {
        const nodes = this.props.args.nodes;
        const gridSize = (100 * 1.0 / Math.ceil(Math.sqrt(nodes.length))).toString() + '%';

        const GridNodeContainer = {
            width: gridSize,
            height: gridSize,
            float: 'left'
        };

        const renderedNodes = nodes.map((node, key) =>
            // We won't be mutating these so performance will be fine
            // eslint-disable-next-line react/no-array-index-key
            (<div style={GridNodeContainer} key={key}><NodeContainer node={node} /></div>)
        );
        return (
            <div styleName="Grid">
                {renderedNodes}
            </div>
        );
    }
}

export default connect()(cssModules(Grid, styles));
