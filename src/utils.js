export function dateFormatMatch(dates) {
  if (
    /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01]) - \d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(
      dates
    )
  ) {
    dates = dates.split(' ')
    let start = dates[0]
    let end = dates[2]

    let dateRange = { start: start, end: end }
    return dateRange
  } else {
    return null
  }
}

const iconMap = {
  home: {
    iconName: 'bars',
    headingName: 'All Notices'
  },
  important: {
    iconName: 'tags',
    headingName: 'Important Notices'
  },
  bookmark: {
    iconName: 'bookmark',
    headingName: 'Bookmarked Notices'
  },
  expired: {
    iconName: 'time',
    headingName: 'Expired Notices'
  }
}

export function iconName(name) {
  return (iconMap[name] && iconMap[name].iconName) || 'bars'
}

export function headingName(name) {
  return (iconMap[name] && iconMap[name].headingName) || 'All Notices'
}
