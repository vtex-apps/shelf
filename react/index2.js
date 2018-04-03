import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {compose, graphql} from 'react-apollo'

import createAutopersistedBook from './graphql/createAutopersistedBook.graphql'
import deleteAutopersistedBook from './graphql/deleteAutopersistedBook.graphql'
import createCachedBook from './graphql/createCachedBook.graphql'
import deleteCachedBook from './graphql/deleteCachedBook.graphql'
import getBooks from './graphql/getBooks.graphql'

import {BooksManager} from './BooksManager'

class Library extends Component {
  render() {
    const {
      data: {autopersistedBooks, cachedBooks},
      createAutopersistedBook,
      deleteAutopersistedBook,
      createCachedBook,
      deleteCachedBook
    } = this.props

    const inlineStyle = {
      padding: '15px'
    }

    return (
      <div style={inlineStyle}>
        <BooksManager
          title="Auto Persisted Books"
          books={autopersistedBooks}
          onCreate={createAutopersistedBook}
          onDelete={deleteAutopersistedBook}
          onGet={getBooks}
        />
        <BooksManager
          title="Cached Books"
          books={cachedBooks}
          onCreate={createCachedBook}
          onDelete={deleteCachedBook}
          onGet={getBooks}
        />
      </div>
    )
  }
}

Library.propTypes = {
  data: PropTypes.object,
  mutate: PropTypes.func
}

export default compose(
  graphql(createAutopersistedBook, {name: 'createAutopersistedBook'}),
  graphql(deleteAutopersistedBook, {name: 'deleteAutopersistedBook'}),
  graphql(createCachedBook, {name: 'createCachedBook'}),
  graphql(deleteCachedBook, {name: 'deleteCachedBook'}),
  graphql(getBooks)
)(Library)
