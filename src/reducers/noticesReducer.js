const initialState = {
    notices: [],
    totalPages: 1,
}

const noticesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_NOTICES_SUCCESS':
            return {
                ...state,
                notices: action.payload.notices,
                totalPages: action.payload.totalPages
            };
        default:
            return state;
    }
}

export default noticesReducer