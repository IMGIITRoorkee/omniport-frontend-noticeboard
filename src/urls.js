export function urlMainApp () {
    return '/api/noticeboard/'
}

export function urlExpiredNotices (page, search_keyword) {
    if (search_keyword === undefined) {
        return `${urlMainApp()}old/?page=${page}`
    } else {
        return `${urlMainApp()}old/?page=${page}&keyword=${search_keyword}`
    }
}

export function urlNotices (page, search_keyword) {
    if (search_keyword === undefined) {
        return `${urlMainApp()}new/?page=${page}`
    } else {
        return `${urlMainApp()}new/?page=${page}&keyword=${search_keyword}`
    }
}

export function urlBookmarkedNotices (page) {
    return `${urlMainApp()}star_filter_view/?page=${page}`
}

export function urlFilterList(page) {
    return `${urlMainApp()}filter_list/`
}

export function urlNotice (id, expired) {
    if (!expired) {
       return `${urlMainApp()}new/${id}/`;
    } else {
        return `${urlMainApp()}old/${id}/`
    }
}

export function urlStarRead () {
    return `${urlMainApp()}star_read/`
}