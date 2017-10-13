import React, { Component } from 'react';
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
