const initialState = {
    filters: []
}

const filtersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_FILTERS':
            return {
                ...state,
                filters: action.payload.filters
            }
        default:
            return state
    }
}

export default filtersReducer
