import React, { Component } from 'react';
import faker from 'faker';
import { genres, genders } from './mockDB';
import BookList from './Components/BookList';
import Filter from './Components/Filter';
import ArrowUp from 'react-icons/lib/fa/arrow-up';
import ArrowDown from 'react-icons/lib/fa/arrow-down';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      books: [],
      genres: [],
      genders: [],
      isLoading: true,
      numberOfBooks: null,
      filters: {
        genre: 'All',
        gender: 'All'
      }
    };
  }

  getGenres() {
    // db.getGenres().then(genres => {
    //   this.setState({
    //     genres,
    //     isLoading: false
    //   });
    // });

    this.setState({
      genres,
      genders,
      isLoading: false
    });
  }
  componentDidMount() {
    this.getGenres();
    // this.generateBooks();
  }
  generateBooks(numberOfBooks) {
    const capitalizeWords = str => {
      return str.replace(/\w\S*/g, txt => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    };
    let { genres, genders } = this.state;
    // remove All from list of genres and genders
    genres = genres.slice(1);
    genders = genders.slice(1);

    const book = {
      visible: 1
    };

    const books = [...Array(numberOfBooks)].map((x, i) => {
      const id = i;
      const title = capitalizeWords(faker.lorem.words());
      const authorFirstName = faker.name.firstName();
      const authorLastName = faker.name.lastName();
      const authorName = `${authorLastName}, ${authorFirstName}`;
      const authorGender = genders[Math.floor(Math.random() * genders.length)];
      const genre = genres[Math.floor(Math.random() * genres.length)];
      const published = faker.date.past(100).toISOString().substr(0, 10);
      return Object.assign({}, book, {
        id,
        title,
        authorName,
        authorGender,
        genre,
        published
      });
    });
    this.setState({
      books,
      numberOfBooks
    });
  }
  sortBooks(type = '', dir) {
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
          } else {
            return a.id < b.id ? -1 : 1;
          }
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
          } else {
            return a.id > b.id ? -1 : 1;
          }
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
        <div className="">
          <header className="">
            <h1 className="">One Million Books...</h1>
          </header>
          {!this.state.books.length
            ? <main className="book--container-empty">
                <h3>Click here to generate books</h3>
                <div className="button--holder">
                  <button
                    className="button--generate-small"
                    onClick={() => this.generateBooks(10)}>
                    10
                  </button>
                  <button
                    className="button--generate-large"
                    onClick={() => this.generateBooks(1000000)}>
                    1000000
                  </button>
                  <button
                    className="button--generate-small"
                    onClick={() => this.generateBooks(1000)}>
                    1000
                  </button>
                </div>
              </main>
            : <main className="book--container-full">
                <section className="filters">
                  <div className="sort">
                    Book title:
                    <button
                      className="button--sort"
                      onClick={() => this.sortBooks('title', 1)}>
                      <ArrowDown />
                    </button>
                    <button
                      className="button--sort"
                      onClick={() => this.sortBooks('title', 0)}>
                      <ArrowUp />
                    </button>
                  </div>
                  <div className="sort">
                    Author:
                    <button
                      className="button--sort"
                      onClick={() => this.sortBooks('author', 1)}>
                      <ArrowDown />
                    </button>
                    <button
                      className="button--sort"
                      onClick={() => this.sortBooks('author', 0)}>
                      <ArrowUp />
                    </button>
                  </div>
                  <div className="sort">
                    Date published:
                    <button
                      className="button--sort"
                      onClick={() => this.sortBooks('date', 1)}>
                      <ArrowDown />
                    </button>
                    <button
                      className="button--sort"
                      onClick={() => this.sortBooks('date', 0)}>
                      <ArrowUp />
                    </button>
                  </div>
                  <div className="sort">
                    Id:
                    <button
                      className="button--sort"
                      onClick={() => this.sortBooks('', 1)}>
                      <ArrowDown />
                    </button>
                    <button
                      className="button--sort"
                      onClick={() => this.sortBooks('', 0)}>
                      <ArrowUp />
                    </button>
                  </div>
                </section>
                <section>
                  <Filter
                    filterCategories={this.state.genres}
                    filterType="genre"
                    activeFilter={this.state.filters.genre}
                    updateFilters={(e, filterType) => this.updateFilters(e, filterType)}
                  />
                  <Filter
                    filterCategories={this.state.genders}
                    filterType="gender"
                    activeFilter={this.state.filters.gender}
                    updateFilters={(e, filterType) => this.updateFilters(e, filterType)}
                  />
                </section>
                <BookList books={this.state.books} />
              </main>}
        </div>
      );
    }
  }
}

export default App;
