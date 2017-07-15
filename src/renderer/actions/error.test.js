import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { push } from 'react-router-redux';

import * as error from './error';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

it('should create an action to change the error obj', () => {
    const errorObj = { msg: 'error msg', active: true };
    const expectedAction = { type: 'ERROR_CHANGE', payload: errorObj };

    expect(error.changeError(errorObj)).toEqual(expectedAction);
});

it('should display an error', () => {
    const store = mockStore({});

    const msg = 'Error msg';

    store.dispatch(error.displayError(msg));
    const actions = store.getActions();

    expect(actions).toEqual([
        error.changeError({ msg, active: true }),
        push('/error')
    ]);
});
