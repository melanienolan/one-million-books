import React from 'react';
import BookList from '../Components/BookList';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import db from '../mockDB';

Enzyme.configure({ adapter: new Adapter() });

it('renders book list component with books without crashing', () => {
  const { books } = db;
  Enzyme.shallow(<BookList books={books} />);
});
it('renders book list component with no books without crashing', () => {
  const books = [];
  Enzyme.shallow(<BookList books={books} />);
});

it('renders book list error message with no books', () => {
  const books = [];
  const bookListComponent = Enzyme.shallow(<BookList books={books} />);
  expect(toJson(bookListComponent)).toMatchSnapshot();
});
