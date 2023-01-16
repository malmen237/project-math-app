/* eslint-disable max-len */
import React from 'react';
import styled from 'styled-components/macro';
import { Devices } from '../../Styles/globalStyles';

const SingleQuestion = ({ operation, problem }) => {
  const questionWrapper = () => {
    if (operation === '+') {
      return <Question>Question: What is {problem[0]} + {problem[1]} + {problem[2]}?</Question>
    } else if (operation === '-') {
      return <Question>Question: What is {problem[0]} - {problem[1]} - {problem[2]}?</Question>
    } else if (operation === '*') {
      return <Question>Question: What is {problem[0]} * {problem[1]}?</Question>
    } else if (operation === '/') {
      return <Question>Question: What is {problem[0]} / {problem[1]}?</Question>
    } else if (operation === 'eq') {
      return <Question>Question: In the equation: {problem[0]}x + {problem[1]} = {problem[2]}. What is the value of x?</Question>
    } else if (operation === 'fr') {
      return <Question>Question: What is {problem[0]}{problem[1]} {problem[2]} {problem[3]}{problem[4]}?</Question>
    }
  }

  return (
    <>
      {questionWrapper()}
    </>
  )
}

export default SingleQuestion;

const Question = styled.h1`
  width: 90%;
  font-size: 1.3rem;
  font-weight: bold;
  color: white;
  margin-bottom: 1rem;

  @media ${Devices.desktop} {
    width: 50%;
    margin-bottom: 2rem;
  }
`

