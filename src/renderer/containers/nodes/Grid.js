import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import NodeContainer from '../NodeContainer';

class Grid extends Component {
    render() {
        const nodes = this.props.args.nodes;
        const gridSize = (100 * 1.0 / Math.ceil(Math.sqrt(nodes.length))).toString() + '%';

        const GridNodeContainer = styled.div`
            width: ${gridSize} !important;
            height: ${gridSize} !important;
            float: left;
        `;

        const renderedNodes = nodes.map((node, key) =>
            // We won't be mutating these so performance will be fine
            // eslint-disable-next-line react/no-array-index-key
            (<GridNodeContainer key={key}><NodeContainer node={node} /></GridNodeContainer>)
        );
        return (
            <div>
                {renderedNodes}
            </div>
        );
    }
}

export default connect()(Grid);
