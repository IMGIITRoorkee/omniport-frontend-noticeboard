import config from '../config.json'

//Backend
export const baseApiUrl = () => {
    return `/api/noticeboard/`
}

export function noticeUrl(id, expired) {
    if (!expired) {
        return `${baseApiUrl()}new/${id}/`
    } else {
        return `${baseApiUrl()}old/${id}/`
    }
}

export function starReadUrl() {
    return `${baseApiUrl()}star_read/`
}

export function filterListUrl() {
    return `${baseApiUrl()}filter_list/`
}

export function filterUrl(page, banner_id, search_keyword, main_category_slug, sortMode = 'date') {
    let url
    if (main_category_slug) {
        url = `${baseApiUrl()}filter/?main_category=${banner_id}&page=${page}`
    } else {
        url = `${baseApiUrl()}filter/?banner=${banner_id}&page=${page}`
    }
    return searchGetParamUrl(url, search_keyword, sortMode)
}

export function dateFilterUrl(
    page,
    start,
    end,
    banner_id,
    main_category_slug,
    search_keyword,
    sortMode = 'date'
) {
    let url
    url = `${baseApiUrl()}date_filter_view/?start=${start}&end=${end}&page=${page}`

    if (main_category_slug) {
        url += `&main_category=${banner_id}`
    } else if (banner_id) {
        url += `&banner=${banner_id}`
    }
    return searchGetParamUrl(url, search_keyword, sortMode)
}

export function addImportantUrl(url) {
    let key = url.includes('?') ? '&' : '?'
    url += `${key}important=true`
    return url
}

export function searchGetParamUrl(url, search_keyword, sortMode = 'date') {
    if (search_keyword) {
        url += `&keyword=${encodeURIComponent(search_keyword)}`
        url += `&sort=${encodeURIComponent(sortMode || 'date')}`
    }
    return url
}

export function expiredNoticesUrl(page, search_keyword, sortMode = 'date') {
    let url = `${baseApiUrl()}old/?page=${page}`
    return searchGetParamUrl(url, search_keyword, sortMode)
}

export function importantNoticesUrl(page = 1, search_keyword, sortMode = 'date') {
    let url = `${baseApiUrl()}new/?important=true&page=${page}`
    return searchGetParamUrl(url, search_keyword, sortMode)
}

export function noticesUrl(page, search_keyword, sortMode = 'date') {
    let url = `${baseApiUrl()}new/?page=${page}`
    return searchGetParamUrl(url, search_keyword, sortMode)
}

export function bookmarkedNoticesUrl(page) {
    return `${baseApiUrl()}star_filter_view/?page=${page}`
}

export function uploadNoticeUrl() {
    return `${baseApiUrl()}new/`
}

export function noticeIdUrl(id, type = 'new') {
    return `${baseApiUrl()}${type}/${id}/`
}

export function permissionsUrl() {
    return `${baseApiUrl()}permissions/`
}

export function copyMediaUrl() {
    return `${baseApiUrl()}copy_media/`
}


//Frontend
export const baseNavUrl = forwardLink => {
    return `${config.baseUrl}${forwardLink}`
}

export const bannerUrl = (bannerId = null, searchKeyword = null, dateFilter = null, sortMode = 'date') => {
    let url = baseNavUrl('/')
    if(bannerId) {
        url += `${bannerId}/`
    }
    url += `?page=1`
    if(dateFilter) {
        url += `&date=${encodeURIComponent(dateFilter.start + '/' + dateFilter.end)}`
    }
    if(searchKeyword) {
        url += `&search=${encodeURIComponent(searchKeyword)}`
        url += `&sortMode=${encodeURIComponent(sortMode || 'date')}`
    }
    return url
}

export function fileManagerUrl() {
    return `/file-manager/default/?mode=integration`
}
