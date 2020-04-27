declare module 'vtex.native-types' {
  import type { Component } from 'react'
  import type { InjectedIntl, InjectedIntlProps } from 'react-intl'

  interface FormatIOMessageParams {
    id: string
    intl: InjectedIntl
  }

  export const formatIOMessage: (params: FormatIOMessageParams) => string

  interface IOMessageProps extends InjectedIntlProps {
    id: string
  }

  export const IOMessage: Component<IOMessageProps>
}
