import config from '../config.json'

//Backend
export const baseApiUrl = () => {
    return `/api/noticeboard/`
}

export const noticesUrl = (page) => {
    let url = `${baseApiUrl()}new/?page=${page}`
    return url
}

//Frontend
export const baseNavUrl = forwardLink => {
    return `${config.baseUrl}${forwardLink}`
}