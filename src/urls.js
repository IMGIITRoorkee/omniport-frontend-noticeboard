// Frontend
export function urlFileManager() {
  return `/file_manager`
}

// Backend
export function urlMainApp() {
  return '/api/noticeboard/'
}

export function urlAddImportant(url) {
  let key = url.includes('?') ? '&' : '?'
  url += `${key}important=true`
  return url
}

export function urlSearchGetParam(url, search_keyword) {
  if (search_keyword) {
    url += `&keyword=${search_keyword}`
  }
  return url
}

export function urlExpiredNotices(page, search_keyword) {
  let url = `${urlMainApp()}old/?page=${page}`
  return urlSearchGetParam(url, search_keyword)
}

export function urlImportantNotices(page, search_keyword) {
  let url = `${urlMainApp()}new/?important=true&page=${page}`
  return urlSearchGetParam(url, search_keyword)
}

export function urlNotices(page, search_keyword) {
  let url = `${urlMainApp()}new/?page=${page}`
  return urlSearchGetParam(url, search_keyword)
}

export function urlBookmarkedNotices(page) {
  return `${urlMainApp()}star_filter_view/?page=${page}`
}

export function urlNotice(id, expired) {
  if (!expired) {
    return `${urlMainApp()}new/${id}/`
  } else {
    return `${urlMainApp()}old/${id}/`
  }
}

export function urlFilterList() {
  return `${urlMainApp()}filter_list/`
}

export function urlFilter(page, banner_id, search_keyword, main_category_slug) {
  let url
  if (main_category_slug) {
    url = `${urlMainApp()}filter/?main_category=${banner_id}&page=${page}`
  } else {
    url = `${urlMainApp()}filter/?banner=${banner_id}&page=${page}`
  }
  return urlSearchGetParam(url, search_keyword)
}

export function urlDateFilter(
  page,
  start,
  end,
  banner_id,
  main_category_slug,
  search_keyword
) {
  let url
  url = `${urlMainApp()}date_filter_view/?start=${start}&end=${end}&page=${page}`

  if (main_category_slug) {
    url += `&main_category=${banner_id}`
  } else if (banner_id) {
    url += `&banner=${banner_id}`
  }
  return urlSearchGetParam(url, search_keyword)
}

export function urlStarRead() {
  return `${urlMainApp()}star_read/`
}

export function urlUploadNotice() {
  return `${urlMainApp()}new/`
}

export function urlPermissions() {
  return `${urlMainApp()}permissions/`
}

export function urlCopyMedia() {
  return `${urlMainApp()}copy_media/`
}
