import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';
class SearchBooks extends Component {
    state = {
        query: '',
        books: []
    };
    updateQuery = query => {
        this.setState({ query: query.trim() });
        this.searchBooks(query);
    };
    searchBooks = query => {
        BooksAPI.search(query, 20).then(books => {
            if (!books.error) {
                return this.setState({ books });
            }
        });
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
                        {this.state.books.map(book => <Book key={book.id} book={book} />)}
                    </ol>
                </div>
            </div>
        );
    }
}
export default SearchBooks;