export const setFilters = (page, date, searchKeyword, showImp, expired, narrowBookmark, mainCategorySlug, bannerId) => (dispatch) => {
    if(!page){
        page = 1
    }
    dispatch({
        type: 'SET_FILTERS',
        payload: {
            page,
            date,
            searchKeyword,
            showImp, 
            expired, 
            narrowBookmark, 
            mainCategorySlug, 
            bannerId
        }
    })
}
