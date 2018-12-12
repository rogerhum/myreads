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
        BooksAPI.update(book, shelf);
    };

  render() {
      return (
          <div className="app">
              <Route exact path="/" render={() => <ListBooks books={this.state.books} updateBook={this.updateBook} />} />
              <Route path="/search" render={() => <SearchBooks books={this.state.books} updateBook={this.updateBook} />} />
          </div>
      );
  }
}

export default BooksApp
