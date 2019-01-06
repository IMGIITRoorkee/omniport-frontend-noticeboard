export function urlMainApp () {
    return '/api/noticeboard/'
}

export function urlNotices (page) {
    return `${urlMainApp()}new/?page=${page}`
}

export function urlSearchNotices (page, search_keyword) {
    return `${urlMainApp()}new/?page=${page}&keyword=${search_keyword}`
}

export function urlBookmarkedNotices (page) {
    return `${urlMainApp()}star_filter_view/?page=${page}`
}

export function urlNotice (id) {
    return `${urlMainApp()}new/${id}/`
}

export function urlStarRead () {
    return `${urlMainApp()}star_read/`
}