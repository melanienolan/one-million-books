import React from 'react';
import PropTypes from 'prop-types';
import { Column, Table } from 'react-virtualized';
import 'react-virtualized/styles.css';

const BookList = props => {
  let { books } = props;
  books = books.filter(book => book.visible);
  return (
    <Table
      width={600}
      height={360}
      headerHeight={40}
      rowHeight={30}
      rowCount={books.length}
      rowGetter={({ index }) => books[index]}>
      <Column label="Id" dataKey="id" width={50} />
      <Column label="Title" dataKey="title" width={150} />
      <Column label="Author Name" dataKey="authorName" width={100} />
      <Column label="Author Gender" dataKey="authorGender" width={100} />
      <Column label="Genre" dataKey="genre" width={100} />
      <Column label="Published" dataKey="published" width={100} />
    </Table>
  );
};

BookList.propTypes = {
  books: PropTypes.array
};

export default BookList;
