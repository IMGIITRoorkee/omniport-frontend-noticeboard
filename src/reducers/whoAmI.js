const initialState = {
    user: null,
    isFetchingUser: true
}

const whoAmI = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                user: action.payload,
                isFetchingUser: false
            }
        default:
            return state
    }
}
export default whoAmI