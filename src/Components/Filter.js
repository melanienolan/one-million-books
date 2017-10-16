import React from 'react';
import PropTypes from 'prop-types';

const Filter = props => {
  const { filterType, filterCategories, activeFilter } = props;
  const renderList = () => {
    return filterCategories.map((category, i) => {
      return (
        <option key={i} value={category}>
          {category}
        </option>
      );
    });
  };
  return (
    <div>
      <form className="form" action="">
        <label className="form--label">
          <span className="form--text">{`Filter by ${filterType}`}</span>
          <select
            className="form--input"
            onChange={e => props.filterBooks(e, filterType)}
            value={props.activeFilter}
            name="filter"
            id="">
            {renderList()}
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
