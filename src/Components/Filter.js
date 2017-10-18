import React from 'react';
import PropTypes from 'prop-types';

const Filter = ({ filterType, filterCategories, activeFilter, updateFilters }) => {
  const unCamelCaser = str => {
    return str.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };
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
          <span className="form--text">
            {unCamelCaser(filterType)}
          </span>
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
  filterType: PropTypes.string,
  filterCategories: PropTypes.array,
  activeFilter: PropTypes.string,
  updateFilters: PropTypes.func
};

export default Filter;
