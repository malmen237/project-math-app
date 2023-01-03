/* eslint-disable no-nested-ternary */
import React from 'react';

const TextForm = ({ handleUserAnswerInput, onKeyDown, answer }) => {
  return (
    <input
      type="text"
      id="question"
      placeholder="Answer"
      value={answer}
      onChange={(event) => handleUserAnswerInput(event)}
      onKeyDown={(event) => onKeyDown(event)} />
  );
}

export default TextForm;

