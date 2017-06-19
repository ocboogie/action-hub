import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';

const history = createHashHistory();

const configureStore = (initialState) => {
    // Redux Configuration
    const middleware = [];
    const enhancers = [];

    // Thunk Middleware
    middleware.push(thunk);

    // Router Middleware
    const router = routerMiddleware(history);
    middleware.push(router);

    // Apply Middleware & Compose Enhancers
    enhancers.push(applyMiddleware(...middleware));
    const enhancer = compose(...enhancers);

    // Create Store
    const store = createStore(rootReducer, initialState, enhancer);

    return store;
};

export { history, configureStore };
