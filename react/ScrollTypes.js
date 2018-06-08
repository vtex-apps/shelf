const scrollTypes = {
  BY_PAGE: {
    name: 'editor.shelf.scrollType.byPage',
    value: 'BY_PAGE',
  },
  ONE_BY_ONE: {
    name: 'editor.shelf.scrollType.oneByOne',
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
