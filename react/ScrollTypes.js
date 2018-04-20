const scrollTypes = {
  BY_PAGE: {
    name: 'By Page',
    value: 'BY_PAGE',
  },
  ONE_BY_ONE: {
    name: 'One By One',
    value: 'ONE_BY_ONE',
  },
}

export function getScrollNames() {
  const names = []
  for (const key in scrollTypes) {
    names.push(scrollTypes[key].name)
  }
  return names
}

export function getScrollValues() {
  const values = []
  for (const key in scrollTypes) {
    values.push(scrollTypes[key].value)
  }
  return values
}

export default scrollTypes
