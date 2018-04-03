interface Book {
  id: string
  name: string
  authors: string[]
}

class BookDatabase {
  private idCounter = 0
  private books: Book[] = []

  constructor() {
    this.books.push({
      id: this.newID(),
      name: 'Default Cached Book',
      authors: ['Default Author 1', 'Default Author 2']
    })
  }

  private newID(): string {
    return (this.idCounter++).toString()
  }

  public get(): Book[] {
    return this.books
  }

  public getById(id: string): Book {
    return this.books.find((book) => book.id === id)
  }

  public delete(id: string): boolean {
    const index = this.books.findIndex((book) => book.id === id)

    if (index != -1) {
      this.books.splice(index, 1)
      return true
    }
    return false
  }

  public add({authors, name}) {
    const book: Book = {
      name,
      authors,
      id: this.newID()
    }
    this.books.push(book)
    return book
  }
}

const mock = new BookDatabase()

export const resolvers = {
  Query: {
    cachedBooks: (_, __) => mock.get(),
    cachedBook: (_, {id}) => mock.getById(id),
  },
  Mutation: {
    deleteCachedBook: (_, {id}) => mock.delete(id),
    createCachedBook: (_, {data}) => mock.add(data)
  }
}
