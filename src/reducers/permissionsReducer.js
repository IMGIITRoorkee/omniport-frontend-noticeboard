const initialState = {
  isFetching: false,
  permission: {},
  normalPer: {}
}

const permissionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PERMISSION_REQUEST':
      return {
        ...state,
        isFetching: true
      }
    case 'FETCH_PERMISSION':
      let permissions = action.payload
      let values = [],
        result = []
      for (let i = 0; i < permissions.length; i++) {
        let val = permissions[i].banner.parentCategory.name
        let index = values.indexOf(val)
        if (index > -1) result[index].push(permissions[i])
        else {
          values.push(val)
          result.push([permissions[i]])
        }
      }
      let finalResult = []
      for (let i = 0; i < result.length; i++) {
        let groupName = result[i][0].banner.parentCategory.name
        let obj = {
          groupName: groupName,
          child: result[i]
        }
        finalResult.push(obj)
      }

      return {
        ...state,
        isFetching: false,
        permission: finalResult,
        normalPer: action.payload
      }
    default:
      return state
  }
}

export default permissionsReducer
