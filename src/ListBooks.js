import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Shelf from './Shelf';
class ListBooks extends Component {
    state = {
        shelves: [
            { id: 'currentlyReading', title: 'Currently Reading' },
            { id: 'wantToRead', title: 'Want to Read' },
            { id: 'read', title: 'Read' }
        ],
        books: []
    };
    componentDidMount() {
        BooksAPI.getAll().then(books => {
            console.log(books);
            this.setState({books});
        });
    }
    updateBook = (book, shelf) => {
        BooksAPI.update(book, shelf).then(data => {
            console.log(data);
            this.setState(prevState => {
                if (shelf === 'none') {
                    return {
                        books: prevState.books.filter(
                            currentBook => currentBook.id !== book.id
                        )
                    };
                }
                return {
                    books: prevState.books.map(currentBook => {
                        if (currentBook.id === book.id) {
                            currentBook.shelf = shelf;
                        }
                        return currentBook;
                    })
                };
            });
        });
    };
    getBooksForShelf = shelf => {
        return this.state.books.filter(book => shelf.id === book.shelf);
    };

    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>

                        {this.state.shelves.map(shelf => <Shelf key={shelf.id} shelf={shelf} books={this.getBooksForShelf(shelf)} updateBook={this.updateBook} /> )}
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        );
    }
}
export default ListBooks;