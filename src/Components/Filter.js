import React from 'react';
import PropTypes from 'prop-types';

const Filter = ({ filterType, filterCategories, activeFilter, updateFilters }) => {
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
            onChange={e => updateFilters(e, filterType)}
            value={activeFilter}
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
  filterCategories: PropTypes.array,
  filterType: PropTypes.string,
  activeFilter: PropTypes.string,
  updateFilters: PropTypes.func
};

export default Filter;
