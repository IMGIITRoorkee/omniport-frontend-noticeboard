export function urlMainApp () {
    return '/api/noticeboard/'
}

export function urlNotices (page) {
    return `${urlMainApp()}new/?page=${page}`
}

export function urlSearchNotices (page, search_keyword) {
    return `${urlMainApp()}new/?page=${page}&keyword=${search_keyword}`
}

export function urlNotice (id) {
    return `${urlMainApp()}new/${id}/`
}