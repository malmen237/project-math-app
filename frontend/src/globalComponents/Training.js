import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { game } from 'reducers/game';
import styled from 'styled-components';

const Training = () => {
  // const [problemSet, setProblemSet] = useState({});
  const [answer, setAnswer] = useState('');
  const [goToNextQuestion, setGoToNextQuestion] = useState('false');

  const dispatch = useDispatch();

  // dispatch(game.actions.submitQuestion())

  const onFormSubmit = (event) => {
    event.preventDefault()
  }

  // Function that activates when user enters an answer,
  // also resets the goToNextQuestion-state hook
  const moveToNext = () => {
    dispatch(game.actions.goToNextQuestion());
    setGoToNextQuestion(false);
  }

  const handleUserAnswerInput = (event) => {
    setAnswer(event.target.value)
    setGoToNextQuestion(true);
    console.log(answer)
  }

  // Get set of questions from database
  useEffect(() => {
    fetch('http://localhost:8080/questions')
      .then((res) => res.json())
      .then((json) => {
        // setProblemSet(json.response)
        dispatch(game.actions.submitQuestion(json.response))
        // console.log(json.response)
      })
  }, []);

  const problem = useSelector((state) => state.game.questions);
  console.log(problem)
  // const trainingOver = useSelector((state) => state.game.gameOver);
  // console.log('trainingOver', trainingOver)

  return (
    <>
      <h1>Question:{problem.question}</h1>
      <form onSubmit={onFormSubmit}>
        <input
          type="text"
          id="question"
          placeholder="Answer"
          value={dispatch(game.actions.submitAnswer(answer))}
          onChange={(event) => handleUserAnswerInput(event)} />
        {goToNextQuestion ? (<StyledButton clickAction={moveToNext} content="Next" />) : (<DisabledButton type="button">Next</DisabledButton>)}
        {/* trainingOver && */(
          <button type="submit">Next</button>
        )}
      </form>
    </>
  )
}

export default Training;

const DisabledButton = styled.button`
  border-radius: 5px;
  color: rgb(0, 0, 0, 0.5);
  font-size: 18px;
  padding: 10px;
  font-family: 'Courier Prime', monospace;
  margin-top: 0;
`

export const StyledButton = styled.button`
  border-radius: 5px;
  color: black;
  font-size: 18px;
  padding: 10px;
  font-family: 'Courier Prime', monospace;
  margin-top: 0;

   &:hover {
    background-color: aliceblue;
   }
`