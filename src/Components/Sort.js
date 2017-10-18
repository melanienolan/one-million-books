import React from 'react';
import PropTypes from 'prop-types';
import ArrowUp from 'react-icons/lib/fa/arrow-up';
import ArrowDown from 'react-icons/lib/fa/arrow-down';

const Sort = ({ type, sortBooks }) => {
  const unCamelCaser = str => {
    return str.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };
  return (
    <div className="sort--holder">
      <span className="sort--title">
        {unCamelCaser(type)}
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
