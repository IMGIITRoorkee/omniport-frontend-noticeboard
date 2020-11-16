//Backend
export const baseApiUrl = () => {
    return `/api/noticeboard/`
}

export const noticesUrl = (page) => {
    let url = `${baseApiUrl()}new/?page=${page}`
    return url
}
