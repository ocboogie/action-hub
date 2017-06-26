import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import node from './node';
import error from './error';

const rootReducer = combineReducers({
    routerReducer,
    node,
    error
});

export default rootReducer;
