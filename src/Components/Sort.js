import React from 'react';
import PropTypes from 'prop-types';
import ArrowUp from 'react-icons/lib/fa/arrow-up';
import ArrowDown from 'react-icons/lib/fa/arrow-down';

const Sort = ({ type, sortBooks }) => {
  const capitalizeFirstLetter = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <div className="sort--holder">
      <span className="sort--title">
        {capitalizeFirstLetter(type)}
      </span>
      <button className="button--sort" onClick={() => sortBooks(type, 1)}>
        <ArrowDown />
      </button>
      <button className="button--sort" onClick={() => sortBooks(type, 0)}>
        <ArrowUp />
      </button>
    </div>
  );
};

export default Sort;

Sort.propTypes = {
  type: PropTypes.string,
  sortBooks: PropTypes.func
};
