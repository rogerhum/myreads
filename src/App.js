import React from 'react'
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';
import './App.css';
class BooksApp extends React.Component {
    state = {
        books: []
    };
    componentDidMount() {
        BooksAPI.getAll().then(books => {
            console.log(books);
            this.setState({ books });
        });
    }
    isNewBook = book => {
        const matchedBooks = this.state.books.filter(
            myBook => myBook.id === book.id
        );
        return matchedBooks.length === 0;
    };
    addBook = (book, shelf) => {
        this.setState(prevState => {
            book.shelf = shelf;
            prevState.books.push(book);
            return {
                books: prevState.books
            };
        });
    };
    updateBook = (book, shelf) => {
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
    };
    handleShelfChange = (book, shelf) => {
        if (this.isNewBook(book)) {
            this.addBook(book, shelf);
        } else {
            this.updateBook(book, shelf);
        }
        BooksAPI.update(book, shelf);
    };

  render() {
      return (
          <div className="app">
              <Route exact path="/" render={() => <ListBooks books={this.state.books} updateBook={this.handleShelfChange} />} />
              <Route path="/search" render={() => <SearchBooks books={this.state.books} updateBook={this.handleShelfChange} />} />
          </div>
      );
  }
}

export default BooksApp
