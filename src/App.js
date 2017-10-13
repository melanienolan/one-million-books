import React, { Component } from 'react';
import faker from 'faker';
import db from './mockDB';
import logo from './logo.svg';
import './App.css';

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
    db.getGenres().then(genres => {
      this.setState({
        genres,
        isLoading: false
      });
    });
  }
  componentDidMount() {
    this.getGenres();
    this.generateBooks();
  }
  generateBooks() {
    let id = 0;
    const capitalizeWords = str => {
      return str.replace(/\w\S*/g, txt => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    };
    const genres = this.state.genres;
    const numberOfBooks = 10000;
    const books = [...Array(numberOfBooks)].map(x => {
      id++;
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

  render() {
    return (
      <div className="">
        <header className="">
          <h1 className="">One Million Books...</h1>
        </header>
        <section className="filters">
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
          <button>5</button>
        </section>
        <main className="books--container-empty">
          <h3>Click here to generate books</h3>
          <button className="button--generate" />
        </main>
        <main className="books--container-full">
          <ul className="books--list">
            <li className="books--item">One item</li>
            <li className="books--item">One item</li>
            <li className="books--item">One item</li>
          </ul>
        </main>
      </div>
    );
  }
}

export default App;
