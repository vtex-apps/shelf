import {Component} from 'react'

export class BooksManager extends Component {
  constructor(props) {
    super(props)
    this.state = Object.assign({}, {
      name: '',
      authors: '',
      id: ''
    })
  }

  createBook() {
    const options = {
      variables: {
        name: this.state.name,
        authors: this.state.authors.split(',')
      },
      refetchQueries: [{query: this.props.onGet}]
    }

    this.props.onCreate(options).then(this.clearInput.bind(this))
  }

  deleteBook() {
    const options = {
      variables: {
        id: this.state.id
      },
      refetchQueries: [{query: this.props.onGet}]
    }

    this.props.onDelete(options).then(this.clearInput.bind(this))
  }

  clearInput() {
    this.setState({
      name: '',
      authors: '',
      id: ''
    })
  }

  render() {
    const {title, books} = this.props

    return (
      <div>
        <h2>{title}</h2>
        <h3>Books in the Library</h3>
        {books && books.map(({id, name, authors}) => {
          return <div key={id}>
            <b>{name || 'Name me, please'}</b>
            <br/>Authors(split by ','): {(authors && authors.map((authors) => `${authors}, `)) || 'Give me a father, please'}
            <br/>ID (click to select):<div onClick={event => this.setState({id: id})}>{id || 'I should have an ID, this is embarrassing'}</div>
            <br/>
          </div>
        })}
        <br/><hr/>

        <h3>Add a book to the library</h3>
        <label>Name: <input type="text" value={this.state.name} onChange={event => this.setState({name: event.target.value})} /></label>
        <label>Authors(split by ','): <input type="test" value={this.state.authors} onChange={event => this.setState({authors: event.target.value})} /></label>
        <button onClick={event => this.createBook()}>Insert</button>
        <br/><hr/>

        <h3>Remove a book from the library</h3>
        <label>ID:<input type="text" value={this.state.id} onChange={event => this.setState({id: event.target.value})}/></label>
        <button onClick={event => this.deleteBook()}>DELETE</button>
        <br/><hr/>
      </div>
    )
  }
}
