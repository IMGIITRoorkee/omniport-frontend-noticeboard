export const setFilters = (page, date, searchKeyword) => (dispatch) => {
    if(!page){
        page = 1
    }
    dispatch({
        type: 'SET_FILTERS',
        payload: {
            page,
            date,
            searchKeyword
        }
    })
}
