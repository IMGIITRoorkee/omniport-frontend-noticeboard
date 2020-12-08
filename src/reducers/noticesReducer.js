const initialState = {
    isFetchingNotices: true,
    totalPages: 0,
    importantUnreadCount: 0,
    notices: [],
    showImp: false,
    searchKeyword: null,
    isLoaded: false,
    expired: false,
    narrowBookmark: false,
    bannerId: null,
    dateRange: null,
    selectAllActive: false,
    selectedNotices: [],
    mainCategorySlug: false,
    isUploading: false,
    isFetchingNotice: true,
    noticeExists: false
}

const noticesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_NOTICES_SUCCESS':
            let newState = {
                ...state,
                searchKeyword: action.payload.searchKeyword,
                isFetchingNotices: false,
                selectAllActive: false,
                expired: action.payload.expired,
                totalPages: action.payload.totalPages,
                narrowBookmark: action.payload.narrowBookmark,
                bannerId: action.payload.bannerId,
                mainCategorySlug: action.payload.mainCategorySlug,
                dateRange: action.payload.dateRange,
                notices: action.payload.notices,
                importantUnreadCount: action.payload.importantUnreadCount
            }

            return newState

        case 'FETCH_NOTICES_REQUEST':
            return {
                ...state,
                isFetchingNotices: true,
                notices: [],
                page: action.payload.page,
                searchKeyword: action.payload.searchKeyword
            }

        case 'FETCH_NOTICES_FAILURE':
            return {
                ...state,
                isFetchingNotices: false
            }
        case 'FETCH_NOTICE_REQUEST':
            return {
                ...state,
                isFetchingNotice: true,
                noticeId: action.payload.noticeId
            }
        case 'FETCH_NOTICE_SUCCESS':
            return {
                ...state,
                isFetchingNotice: false,
                notice: action.payload.notice,
                noticeExists: action.payload.noticeExists,
                mediaPath: action.payload.notice.mediaPath
            }
        case 'FETCH_NOTICE_FAILURE':
            return {
                ...state,
                isFetchingNotice: false
            }
        case 'MEDIA_PATH':
            return {
                ...state,
                mediaPath: action.payload.mediaPath
            }
        case 'BOOKMARK_NOTICE':
            let noticeIdList = action.payload.noticeIdList
            let notices = Object.assign([], state.notices)

            for (let index = 0; index < noticeIdList.length; index++) {
                for (let i = 0; i < notices.length; i++) {
                    if (notices[i].id === noticeIdList[index]) {
                        notices[i].starred = action.payload.toggle
                    }
                }
            }
            return { 
                ...state,
                notices
            }
        default:
            return state;
    }
}

export default noticesReducer