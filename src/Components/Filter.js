import React from 'react';
import PropTypes from 'prop-types';

const Filter = props => {
  const renderGenresList = () => {
    return props.genres.map((genre, i) => {
      return (
        <option key={i} value={genre}>
          {genre}
        </option>
      );
    });
  };
  return (
    <div>
      <form className="form" action="">
        <label className="form--label">
          <span className="form--text">Filter by genre:</span>
          <select
            className="form--input"
            onChange={e => props.filterByGenre(e)}
            value={props.selectedGenre}
            name="filter"
            id="">
            {renderGenresList()}
          </select>
        </label>
      </form>
    </div>
  );
};

Filter.propTypes = {
  genres: PropTypes.array,
  selectedGenre: PropTypes.string,
  filterByGenre: PropTypes.func
};

export default Filter;
