import { ipcRenderer } from 'electron';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';

import styles from './NodeManager.styl';
import { backNode } from '../actions/node';
import NodeContainer from './NodeContainer';

class NodeManager extends Component {
    constructor(props) {
        super(props);

        this.handleRightClick = this.handleRightClick.bind(this);
    }

    handleRightClick() {
        if (this.props.node[3]) {
            this.props.dispatch(backNode());
        } else {
            ipcRenderer.send('hide-window');
        }
    }

    render() {
        return (
            <div styleName="NodeManager" onContextMenu={this.handleRightClick}>
                <NodeContainer node={this.props.node} />
            </div>
        );
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(cssModules(NodeManager, styles));
