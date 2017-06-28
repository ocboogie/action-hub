const reducer = (state = {}, action) => {
    if (action) {
        switch (action.type) {
            case 'ERROR_CHANGE':
                return { ...action.payload };
        }
    }
    return state;
};

export default reducer;
