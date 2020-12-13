export const setPosition = (position = '') => {
    return dispatch => {
        dispatch({
            type: 'SET_POSITION',
            payload: {
                position
            }
        })
    }
}
