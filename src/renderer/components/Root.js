import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import styled from 'styled-components';

import Routes from '../Routes';

export default function Root({ store, history }) {
    const Style = styled.div`
        font-family: "roboto";
        background-color: #2d2d2d;
    `;
    return (
        <Style>
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Routes />
                </ConnectedRouter>
            </Provider>
        </Style>
    );
}
