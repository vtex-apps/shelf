import { pluck, values } from 'ramda'

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

export const getGapPaddingNames = () => values(pluck('name', gapPaddingTypes))

export const getGapPaddingValues = () => values(pluck('value', gapPaddingTypes))

export default gapPaddingTypes