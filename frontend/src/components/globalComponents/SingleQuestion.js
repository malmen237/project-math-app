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
      return (
        <>
          <EqQuestion>Question: In the equation:</EqQuestion>
          <EqQuestion>{problem[0]}x + {problem[1]} = {problem[2]}.</EqQuestion>
          <Question>What is the value of x?</Question>
        </>
      )
    } else if (operation === 'fr') {
      return (
        <QuestionWrapper>
          <Question>Question: What is</Question>
          <FractionWrapper><Numerator>{problem[0]}</Numerator><Denominator>{problem[1]}</Denominator></FractionWrapper>
          <Question>{problem[2]}</Question>
          <FractionWrapper><Numerator>{problem[3]}</Numerator><Denominator>{problem[4]}</Denominator></FractionWrapper>
          <Question>?</Question>
        </QuestionWrapper>
        // <QuestionWrapper>
        //   <Question>Question: What is <FractionWrapper><Numerator>{problem[0]}</Numerator><Denominator>{problem[1]}</Denominator></FractionWrapper> {problem[2]} <FractionWrapper><Numerator>{problem[3]}</Numerator><Denominator>{problem[4]}</Denominator></FractionWrapper>?
        //   </Question>
        // </QuestionWrapper>
      )
    }
  }

  return (
    <>
      {questionWrapper()}
    </>
  )
}

export default SingleQuestion;

const QuestionWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const Question = styled.h1`
  width: fit-content;
  font-size: 1.3rem;
  font-weight: bold;
  color: white;
  margin-bottom: 1rem;
  padding: 10px;

  @media ${Devices.desktop} {
    margin-bottom: 2rem;
  }
`

const EqQuestion = styled(Question)`
  margin-bottom: 0rem;
  padding: 10px 5px 5px 5px;

  @media ${Devices.desktop} {
    margin-bottom: 0rem;
  }
`

const FractionWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const Numerator = styled.h1`
  border-bottom: solid white 1px;
  display: inline-block;
  float: left;
  font-size: 1.3rem;
  font-weight: bold;
  color: white;
  padding: 0 0 1px 0;
`

const Denominator = styled.h1`
  display:inline-block;
  clear:left;
  float:left;
  font-size: 1.3rem;
  font-weight: bold;
  color: white;
  padding: 1px 0 0 0;
`
