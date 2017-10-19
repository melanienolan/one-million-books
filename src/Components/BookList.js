import React from 'react';
import PropTypes from 'prop-types';
import { Column, Table } from 'react-virtualized';
import 'react-virtualized/styles.css';

const BookList = ({ books }) => {
  books = books.filter(book => book.visible);
  const errorMessage = 'No books exist with those filters';
  if (!books.length) {
    return (
      <div className="table--empty">
        <div className="table--error">
          {errorMessage}
        </div>
        <p className="table--number">
          Number of books showing: {books.length}
        </p>
      </div>
    );
  }
  return (
    <div>
      <Table
        width={660}
        height={360}
        headerHeight={40}
        rowHeight={30}
        rowCount={books.length}
        rowGetter={({ index }) => books[index]}>
        <Column label="Id" dataKey="id" width={50} />
        <Column label="Title" dataKey="title" width={210} />
        <Column label="Author Name" dataKey="authorName" width={110} />
        <Column label="Author Gender" dataKey="authorGender" width={100} />
        <Column label="Genre" dataKey="genre" width={110} />
        <Column label="Published" dataKey="published" width={80} />
      </Table>
      <p className="table--number">
        Number of books showing: {books.length}
      </p>
    </div>
  );
};

BookList.propTypes = {
  books: PropTypes.array
};

export default BookList;
