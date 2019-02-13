const gapPaddingTypes = {
  NONE: {
    name: 'editor.shelf.gapType.none',
    value:'ph0',
  },
  SMALL: {
    name: 'editor.shelf.gapType.small',
    value:'ph3',
  },
  MEDIUM: {
    name: 'editor.shelf.gapType.medium',
    value:'ph5',
  },
  LARGE: {
    name: 'editor.shelf.gapType.large',
    value:'ph7',
  },
}

export const getGapPaddingNames = () => {
  const names = []
  for (const key in gapPaddingTypes) names.push(gapPaddingTypes[key].name)
  return names
}

export const getGapPaddingValues = () => {
  const values = []
  for (const key in gapPaddingTypes) values.push(gapPaddingTypes[key].value)
  return values
}

export default gapPaddingTypes