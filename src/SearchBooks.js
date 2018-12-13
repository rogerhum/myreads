import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';
class SearchBooks extends Component {
    state = {
        query: '',
        books: []
    };
    componentWillReceiveProps(nextProps) {
        if (this.state.books.length > 0 && nextProps.books.length > 0) {
            this.setBookShelves(this.state.books, nextProps.books);
        }
    }
    updateQuery = query => {
        this.setState({ query });
        this.searchBooks(query);
    };
    searchBooks = query => {
        if (query === '') {
            this.setState({ books: [] });
        } else {
            BooksAPI.search(query, 20).then(books => {
                if (Array.isArray(books)) {
                    this.setBookShelves(books, this.props.books);
                }
            });
        }
    };
    setBookShelves = (searchBooks, myBooks) => {
        const correctlyShelvedBooks = searchBooks.map(searchBook => {
            const myBook = myBooks.filter(
                propBook => propBook.id === searchBook.id
            )[0];
            if (myBook) {
                searchBook.shelf = myBook.shelf;
            }else {
                searchBook.shelf = 'none';

            }
            return searchBook;
        });
        if (this.state.books !== correctlyShelvedBooks) {
            this.setState({ books: correctlyShelvedBooks });
        }
    };
    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">
                        Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Pesquise pelo autor" value={this.state.query}
                            onChange={event => this.updateQuery(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.books.map(book =>
                            <Book key={book.id} book={book} onShelfChange={this.props.updateBook}/>
                        )}
                    </ol>
                </div>
            </div>
        );
    }
}
export default SearchBooks;