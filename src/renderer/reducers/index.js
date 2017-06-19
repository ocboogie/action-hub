import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import node from './node';

const rootReducer = combineReducers({
    routerReducer,
    node
});

export default rootReducer;
