import { default_sort_mode } from '../const'

export const setFilters = (page, date, searchKeyword, showImp, expired, narrowBookmark, mainCategorySlug, bannerId, sortMode = default_sort_mode) => (dispatch) => {
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
            bannerId,
            sortMode
        }
    })
}
