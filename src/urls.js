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

export function filterUrl(page, banner_id, search_keyword, main_category_slug) {
    let url
    if (main_category_slug) {
        url = `${baseApiUrl()}filter/?main_category=${banner_id}&page=${page}`
    } else {
        url = `${baseApiUrl()}filter/?banner=${banner_id}&page=${page}`
    }
    return searchGetParamUrl(url, search_keyword)
}

export function dateFilterUrl(
    page,
    start,
    end,
    banner_id,
    main_category_slug,
    search_keyword
) {
    let url
    url = `${baseApiUrl()}date_filter_view/?start=${start}&end=${end}&page=${page}`

    if (main_category_slug) {
        url += `&main_category=${banner_id}`
    } else if (banner_id) {
        url += `&banner=${banner_id}`
    }
    return searchGetParamUrl(url, search_keyword)
}

export function addImportantUrl(url) {
    let key = url.includes('?') ? '&' : '?'
    url += `${key}important=true`
    return url
}

export function searchGetParamUrl(url, search_keyword) {
    if (search_keyword) {
        url += `&keyword=${search_keyword}`
    }
    return url
}

export function expiredNoticesUrl(page, search_keyword) {
    let url = `${baseApiUrl()}old/?page=${page}`
    return searchGetParamUrl(url, search_keyword)
}

export function importantNoticesUrl(page = 1, search_keyword) {
    let url = `${baseApiUrl()}new/?important=true&page=${page}`
    return searchGetParamUrl(url, search_keyword)
}

export function noticesUrl(page, search_keyword) {
    let url = `${baseApiUrl()}new/?page=${page}`
    return searchGetParamUrl(url, search_keyword)
}

export function bookmarkedNoticesUrl(page) {
    return `${baseApiUrl()}star_filter_view/?page=${page}`
}


//Frontend
export const baseNavUrl = forwardLink => {
    return `${config.baseUrl}${forwardLink}`
}

export const bannerUrl = (bannerId = null, searchKeyword = null, dateFilter = null) => {
    let url = baseNavUrl('/')
    if(bannerId) {
        url += `${bannerId}/`
    }
    url += `?page=1`
    if(dateFilter) {
        url += `&date=${dateFilter.start+'/'+dateFilter.end}`
    }
    if(searchKeyword) {
        url += `&search=${searchKeyword}`
    }
    return url
}