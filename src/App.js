import React, { Component } from 'react';
import db from './mockDB';
import GenerateButton from './Components/GenerateButton';
import BookList from './Components/BookList';
import Sort from './Components/Sort';
import Filter from './Components/Filter';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      books: [],
      genres: [],
      genders: [],
      specialDates: [],
      isLoading: true,
      numberOfBooks: null,
      filters: {
        genre: 'All',
        gender: 'All',
        specialDates: 'All'
      }
    };
  }
  getData() {
    const { books, genres, genders, specialDates } = db;
    this.setState({
      books,
      genres,
      genders,
      specialDates,
      isLoading: false
    });
  }
  componentDidMount() {
    this.getData();
  }
  getBooks(numberOfBooks) {
    let { books } = this.state;
    books = books.filter(book => book.id < numberOfBooks);
    this.setState({
      books,
      numberOfBooks
    });
  }
  sortBooks(type, dir) {
    let { books } = this.state;
    books = dir
      ? books.slice().sort((a, b) => {
          if (type === 'title') {
            return a.title < b.title ? -1 : 1;
          }
          if (type === 'author') {
            return a.authorName < b.authorName ? -1 : 1;
          }
          if (type === 'date') {
            return a.published < b.published ? -1 : 1;
          }
          if (type === 'id') {
            return a.id < b.id ? -1 : 1;
          }
          return null;
        })
      : books.slice().sort((a, b) => {
          if (type === 'title') {
            return a.title > b.title ? -1 : 1;
          }
          if (type === 'author') {
            return a.authorName > b.authorName ? -1 : 1;
          }
          if (type === 'date') {
            return a.published > b.published ? -1 : 1;
          }
          if (type === 'id') {
            return a.id > b.id ? -1 : 1;
          }
          return null;
        });
    this.setState({
      books
    });
  }
  updateFilters(e, filterType) {
    e.preventDefault();
    const selectedFilter = e.target.value;
    let { filters } = this.state;
    filters[filterType] = selectedFilter;
    this.setState(
      {
        filters
      },
      () => {
        this.filterBooks();
      }
    );
  }
  filterBooks() {
    let { books, filters } = this.state;
    books = books.map(book => {
      if (
        (filters.specialDates === 'All' || book.special === filters.specialDates) &&
        (filters.genre === 'All' || book.genre === filters.genre) &&
        (filters.gender === 'All' || book.authorGender === filters.gender)
      ) {
        book.visible = 1;
      } else {
        book.visible = 0;
      }
      return book;
    });
    this.setState({
      books
    });
  }

  render() {
    if (this.state.isLoading) {
      return <div className="loading">Loading...</div>;
    } else {
      return (
        <div className="app">
          <header className="header">
            <h1 className="header--title">One Million Books...</h1>
          </header>
          {!this.state.numberOfBooks ||
          this.state.books.length !== this.state.numberOfBooks
            ? <main className="book--container-empty">
                <h3>
                  Click here to <br />generate books
                </h3>
                <div className="button--holder">
                  <GenerateButton
                    number={10}
                    generateBooks={number => this.getBooks(number)}
                  />
                  <GenerateButton
                    number={1000000}
                    generateBooks={number => this.getBooks(number)}
                  />
                  <GenerateButton
                    number={1000}
                    generateBooks={number => this.getBooks(number)}
                  />
                </div>
              </main>
            : <main className="book--container-full">
                <section className="section">
                  <div className="section--inner">
                    <h3 className="section--title">Sort by:</h3>
                    <div className="section--container-sort">
                      <Sort
                        type="title"
                        sortBooks={(type, dir) => this.sortBooks(type, dir)}
                      />
                      <Sort
                        type="author"
                        sortBooks={(type, dir) => this.sortBooks(type, dir)}
                      />
                      <Sort
                        type="date"
                        sortBooks={(type, dir) => this.sortBooks(type, dir)}
                      />
                      <Sort
                        type="id"
                        sortBooks={(type, dir) => this.sortBooks(type, dir)}
                      />
                    </div>
                  </div>
                  <div className="section--inner">
                    <h3 className="section--title">Filter by:</h3>
                    <div className="section--container-filter">
                      <Filter
                        filterCategories={this.state.genres}
                        filterType="genre"
                        activeFilter={this.state.filters.genre}
                        updateFilters={(e, filterType) =>
                          this.updateFilters(e, filterType)}
                      />
                      <Filter
                        filterCategories={this.state.genders}
                        filterType="gender"
                        activeFilter={this.state.filters.gender}
                        updateFilters={(e, filterType) =>
                          this.updateFilters(e, filterType)}
                      />
                      <Filter
                        filterCategories={this.state.specialDates}
                        filterType="specialDates"
                        activeFilter={this.state.filters.specialDates}
                        updateFilters={(e, filterType) =>
                          this.updateFilters(e, filterType)}
                      />
                    </div>
                  </div>
                </section>
                <BookList books={this.state.books} />
              </main>}
        </div>
      );
    }
  }
}

export default App;
