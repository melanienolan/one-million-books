import React, { Component } from 'react';
import faker from 'faker';
import { genres } from './mockDB';
import BookList from './Components/BookList';
import logo from './logo.svg';
import './App.css';

const numberOfBooks = 100;

class App extends Component {
  constructor() {
    super();
    this.state = {
      books: [],
      genres: [],
      isLoading: true
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
      isLoading: false
    });
  }
  componentDidMount() {
    this.getGenres();
    // this.generateBooks();
  }
  generateBooks() {
    const capitalizeWords = str => {
      return str.replace(/\w\S*/g, txt => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    };
    const genres = this.state.genres;

    const books = [...Array(numberOfBooks)].map((x, i) => {
      const id = i;
      const title = capitalizeWords(faker.lorem.words());
      const authorFirstName = faker.name.firstName();
      const authorLastName = faker.name.lastName();
      const authorName = `${authorLastName}, ${authorFirstName}`;
      const authorGender = Math.floor(Math.random() * 2) ? 'male' : 'female';
      const genre = genres[Math.floor(Math.random() * genres.length)];
      const published = faker.date.past(100).toISOString().substr(0, 10);
      return Object.assign(
        {},
        {
          id,
          title,
          authorName,
          authorGender,
          genre,
          published
        }
      );
    });
    this.setState({
      books
    });
  }
  sortBooks(dir) {
    let { books } = this.state;
    books = dir
      ? books.slice().sort((a, b) => {
          return a.title < b.title ? -1 : 1;
        })
      : books.slice().sort((a, b) => {
          return a.title > b.title ? -1 : 1;
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
          <section className="filters">
            <button onClick={() => this.sortBooks(1)}>1</button>
            <button onClick={() => this.sortBooks(0)}>2</button>
            <button>3</button>
            <button>4</button>
            <button>5</button>
          </section>
          {this.state.books.length < numberOfBooks
            ? <main className="book--container-empty">
                <h3>Click here to generate books</h3>
                <button
                  className="button--generate"
                  onClick={() => this.generateBooks()}
                />
              </main>
            : <main className="book--container-full">
                <BookList books={this.state.books} />
              </main>}
        </div>
      );
    }
  }
}

export default App;
