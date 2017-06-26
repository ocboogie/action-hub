import React, { Component } from 'react';
import { connect } from 'react-redux';

class ErrorMsg extends Component {
    render() {
        return (
            <div className="error-msg">
                <pre>{this.props.error.msg || ""}</pre>
            </div >
        );
    }
}

const mapStateToProps = (state) => ({error: state.error})


export default connect(mapStateToProps)(ErrorMsg);
