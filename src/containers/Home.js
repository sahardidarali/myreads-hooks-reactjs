import React from 'react';
import Bookshelf from '../components/BookShelf'
import Link from '../config/Link'

function Home(props) {
  const { shelves, books, onMove } = props;

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {shelves.map(shelf => (
            <Bookshelf
              key={shelf.key}
              shelf={shelf}
              books={books}
              onMove={onMove}
            />
          ))}
        </div>
      </div>
      <div className="open-search">
        <Link href="/search">
          <button>Add a Book</button>
        </Link>
      </div>
    </div>
  )
}

export default Home
