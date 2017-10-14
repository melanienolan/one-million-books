import React from 'react';
import PropTypes from 'prop-types';

const BookList = props => {
  const renderList = () => {
    return props.books.map(book => {
      return (
        <li className="book--item" key={book.id}>
          <p className="book--item-text">
            <span className="book--item-field">Title:</span> {book.title}
          </p>
          <p className="book--item-text">
            <span className="book--item-field">Author:</span> {book.authorName}
          </p>
          <p className="book--item-text">
            <span className="book--item-field">Author Gender:</span> {book.authorGender}
          </p>
          <p className="book--item-text">
            <span className="book--item-field">Genre:</span> {book.genre}
          </p>
          <p className="book--item-text">
            <span className="book--item-field">Date published:</span> {book.published}
          </p>
        </li>
      );
    });
  };
  return (
    <ul className="book--list">
      {renderList()}
    </ul>
  );
};

BookList.propTypes = {
  books: PropTypes.array
};

export default BookList;
