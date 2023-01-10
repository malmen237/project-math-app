/* eslint-disable no-nested-ternary */
import React from 'react';
import styled from 'styled-components/macro';

const TextForm = ({ handleUserAnswerInput, answer }) => {
  return (
    <Input
      type="text"
      id="question"
      placeholder="Answer"
      value={answer}
      onChange={(event) => handleUserAnswerInput(event)} />
  );
}

export default TextForm;

const Input = styled.input`
  font-size: 1.2rem;
  padding: 0.5rem;
  width: 65vw;
  height: 3rem;
  background-color: lightgray;
  border: none;
  margin: 1rem 0;
  border-radius: 6px;
  color: #555;
`