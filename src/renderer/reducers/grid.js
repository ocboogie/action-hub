const reducer = (state = {}, action) => {
    if (action) {
        switch (action.type) {
            case "GRID_RELOAD":
                return { ...action.payload }
        }
    }
    return state
}

export default reducer;
