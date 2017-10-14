import React from 'react';
import PropTypes from 'prop-types';
import { Column, Table } from 'react-virtualized';
import 'react-virtualized/styles.css';

const BookList = props => {
  const { books } = props;
  return (
    <Table
      width={550}
      height={300}
      headerHeight={20}
      rowHeight={30}
      rowCount={books.length}
      rowGetter={({ index }) => books[index]}>
      <Column label="Id" dataKey="id" width={50} />
      <Column label="Title" dataKey="title" width={100} />
      <Column label="authorName" dataKey="authorName" width={100} />
      <Column label="authorGender" dataKey="authorGender" width={100} />
      <Column label="Genre" dataKey="genre" width={100} />
      <Column label="Published" dataKey="published" width={100} />
    </Table>
  );
};

BookList.propTypes = {
  books: PropTypes.array
};

export default BookList;
