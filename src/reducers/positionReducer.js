const initialState = {
    position: ''
}

const positionReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_POSITION':
            return {
                ...state,
                position: action.payload.position
            }
        default:
            return state
    }
}

export default positionReducer
