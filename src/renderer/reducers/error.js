const reducer = (state = {}, action) => {
    if (action) {
        switch (action.type) {
            case 'ERROR_MSG_CHANGE':
                return { ...state, msg: action.payload };
        }
    }
    return state;
};

export default reducer;
