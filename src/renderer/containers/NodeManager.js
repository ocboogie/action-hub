import { ipcRenderer } from 'electron';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { backNode } from '../actions/node';
import NodeContainer from './NodeContainer';

class NodeManager extends Component {
    constructor(props) {
        super(props);

        this.handleRightClick = this.handleRightClick.bind(this);
    }

    handleRightClick() {
        if (this.props.node.parent) {
            this.props.dispatch(backNode());
        } else {
            ipcRenderer.send('hide-window');
        }
    }

    render() {
        const NodeManager = styled.div`
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            overflow: hidden;
            div {
                height: 100%;
                width: 100%;
            }
        `;
        return (
            <NodeManager onContextMenu={this.handleRightClick}>
                <NodeContainer node={this.props.node} />
            </NodeManager>
        );
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(NodeManager);
