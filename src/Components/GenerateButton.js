import React from 'react';
import PropTypes from 'prop-types';

const GenerateButton = ({ number, generateBooks }) => {
  return (
    <button
      className={number < 1000000 ? 'button--generate-small' : 'button--generate-large'}
      onClick={() => generateBooks(number)}>
      {number}
    </button>
  );
};

export default GenerateButton;

GenerateButton.propTypes = {
  number: PropTypes.number,
  generateBooks: PropTypes.func
};
