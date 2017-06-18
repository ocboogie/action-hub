const reducer = (state = {}, action) => {
    if (action) {
        switch (action.type) {
            case "NODE_INIT":
            case "NODE_LOAD":
                return { ...action.payload }
        }
    }
    return state
}

export default reducer;
