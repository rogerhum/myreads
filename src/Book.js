import React, { Component } from 'react';
class Book extends Component {
    handleChange = event => {
        this.props.onShelfChange(this.props.book, event.target.value);
    };
    render() {
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div
                            className="book-cover"
                            style={{
                                width: 128,
                                height: 193,
                                backgroundImage: `url(${this.props.book.imageLinks && this.props.book.imageLinks.thumbnail})`
                            }}
                        />
                        <div className="book-shelf-changer">
                            <select
                                value={this.props.book.shelf}
                                onChange={this.handleChange}
                            >
                                <option value="none" disabled>
                                    Move to...
                                </option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="choose">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">
                        {this.props.book.title}
                    </div>
                    <div className="book-authors">
                        {this.props.book.authors && this.props.book.authors.join(', ')}
                    </div>
                </div>
            </li>
        );
    }
}
export default Book;