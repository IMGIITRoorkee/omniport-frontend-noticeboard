export const selectNotice = (id) => (dispatch, getState) => {
    let selectedNotices = getState().notices.selectedNotices
    let selectAllActive
    if (!selectedNotices.includes(id)) {
        selectedNotices.push(id)
    }
    else {
        selectedNotices = selectedNotices.filter(item => item !== id)
    }
    if (selectedNotices.length === 0) {
        selectAllActive = false
    }
    else {
        selectAllActive = true
    }
    dispatch({
        type: 'SELECT_NOTICE',
        payload: {
            selectedNotices: selectedNotices,
            selectAllActive: selectAllActive
        }
    })
}

export const toggleAllNotices = (deSelect = 0) => (dispatch, getState) => {
    let selectedNotices = getState().notices.selectedNotices
    const notices = getState().notices.notices
    let selectAllActive = getState().notices.selectAllActive
    if (selectAllActive || deSelect === 1) {
        selectedNotices = []
        selectAllActive = false
    }
    else {
        selectedNotices = []
        for (let i = 0; i < notices.length; i++) {
            selectedNotices.push(notices[i].id)
        }
        selectAllActive = true
    }
    dispatch({
        type: 'SELECT_NOTICE',
        payload: {
            selectedNotices: selectedNotices,
            selectAllActive: selectAllActive
        }
    })
}
