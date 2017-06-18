import React, { Component } from 'react';
import { connect } from 'react-redux';

import NodeContainer from '../NodeContainer';

class Grid extends Component {
    render() {
        let renderedNodes = [];
        const nodes = this.props.value;
        const gridSize = (100 * 1.0 / Math.ceil(Math.sqrt(nodes.length))).toString() + "%";
        const style = {
            width: gridSize,
            height: gridSize
        }

        nodes.forEach(function(node, key) {
            console.log(node)
            renderedNodes.push(<div style={style} key={key} ><NodeContainer node={node}/></div>);
        });
        // console.log(renderedNodes)
        return (
            <div>
                {renderedNodes}
            </div>
        );
    }
}

export default connect()(Grid)