import React, { useState, useEffect } from 'react'
import * as BooksApi from './api/BooksApi'
import Home from './containers/Home'
import Route from './config/Route'
import './App.css';
import Search from './containers/Search';
const bookshelves = [
  { key: 'currentlyReading', name: 'Currently Reading' },
  { key: 'wantToRead', name: 'Want to Read' },
  { key: 'read', name: 'Read' }
];
function App() {
  const [books, setbooks] = useState([])
  
  
  const moveBook = (book, shelf) => {
    // console.log(book)
    // console.log(shelf)
    BooksApi.update(book, shelf).catch(err => {
      console.log(err);
    });
    if (shelf === 'none') {
      setbooks(books.filter(b => b.id !== book.id))
    } else {
      book.shelf = shelf;
      setbooks([...books,books.filter(b => b.id !== book.id)])
    }
  } 

  useEffect(() => {
    BooksApi.getAll()
      .then(res => {
        setbooks(res)
        console.log('get');
      })
      .catch(err => {
        console.log(err)
      })
  },[])

 

  return (

    <div>

      <Route path="/">
        <Home
          shelves={bookshelves}
          books={books}
          onMove={moveBook}
        />
      </Route>
      <Route
        path="/search">

        <Search
          books={books}
          onMove={moveBook}
           />
      </Route>

    </div>
  )
}

export default App
