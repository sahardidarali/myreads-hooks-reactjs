import React, { useState } from 'react'
import * as BooksApi from '../api/BooksApi'
import BookItem from '../components/BookItem'
import Link from '../config/Link'
function Search(props) {
    const { books, onMove } = props
    const [searchBooks, setsearchBooks] = useState([])
    const [term, setTerm] = useState('')
    const searchForBooks = query => {
        if (query.length > 0) {

            BooksApi.search(query).then(books => {
                if (books.error) {
                    setsearchBooks([])
                } else {
                    setsearchBooks(books)
                    console.log(searchBooks)
                }
            });
        } else {
            setsearchBooks([])
        }
    };
    const onInputChange = event => {
        setTerm(event.target.value)
        searchForBooks(term)
    }
    const resetSearch = () => {
        setsearchBooks([])
    };

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link href="/">
                    <button className="close-search" onClick={resetSearch}>
                        Close
                    </button>
                </Link>
                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        value={term}
                        placeholder="Search by title or author"
                        onChange={onInputChange}
                        autoFocus
                    />
                </div>
            </div>
            <SearchResults
                searchBooks={searchBooks}
                books={books}
                onMove={onMove}
            />
        </div>
    )
}

export default Search
function SearchResults(props) {
    const { searchBooks, books, onMove } = props
    const updatedBooks = searchBooks.map(book => {
        books.map(b => {
            if (b.id === book.id) {
                book.shelf = b.shelf
            }
            return b
        });
        return book
    })
    return (
        <div className="search-books-results">
            <ol className="books-grid">
                {updatedBooks.map(book => (
                    <BookItem
                        key={book.id}
                        book={book}
                        shelf={book.shelf ? book.shelf : 'none'}
                        onMove={onMove}
                    />
                ))}
            </ol>
        </div>
    )
}
