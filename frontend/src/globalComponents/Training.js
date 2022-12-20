/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { game } from 'reducers/game';
import { headShake, pulse } from 'react-animations';
import styled, { keyframes } from 'styled-components/macro';

const HeadShakeAnimation = keyframes`${headShake}`;
const HeartBeatAnimation = keyframes`${pulse}`;

const Training = () => {
  const [answer, setAnswer] = useState('');
  const [nextQuestion, setNextQuestion] = useState(false);
  const [goToNextQuestion, setGoToNextQuestion] = useState('false');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const operation = useSelector((state) => state.game.operation);

  const onFormSubmit = (event) => {
    event.preventDefault();
    navigate('/summary')
  }

  // Function that activates when user enters an answer,
  // also resets the goToNextQuestion-state hook
  const moveToNext = () => {
    dispatch(game.actions.submitAnswer(answer));
    setAnswer('');
    dispatch(game.actions.goToNextQuestion());
    setTimeout(() => { setNextQuestion(true) }, 3000);
    setGoToNextQuestion(false);
  }

  const handleUserAnswerInput = (event) => {
    setAnswer(event.target.value);
    setGoToNextQuestion(true);
  }

  // Get set of questions from database
  useEffect(() => {
    setNextQuestion(false);
    // To post type of math problems to be trained
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        operation
      })
    }
    fetch('http://localhost:8080/questions', options)
      .then((res) => res.json())
      .then((json) => {
        dispatch(game.actions.submitQuestion(json.response));
      })
  }, [nextQuestion]);

  const problem = useSelector((state) => state.game.questions);
  console.log(problem)

  const trainingOver = useSelector((state) => state.game.gameOver);
  console.log('trainingOver', trainingOver)

  const isAnswerCorrect = useSelector((state) => state.game.isCorrect);
  console.log('answer is:', isAnswerCorrect)
  return (
    <>
      <h1>Question: {problem.question}</h1>
      <form onSubmit={onFormSubmit}>
        <input
          type="text"
          id="question"
          placeholder="Answer"
          value={answer}
          onChange={(event) => handleUserAnswerInput(event)} />
        {!trainingOver && (
          <Button
            className={goToNextQuestion ? (isAnswerCorrect ? 'correct' : 'wrong') : 'disabled'}
            onClick={(event) => moveToNext(event)}
            type="button">Next
          </Button>
        )}
        {trainingOver && (
          <button type="submit">Submit</button>
        )}
      </form>
    </>
  )
}

export default Training;

const Button = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: green;
  color: white;
  font-size: 1.5em;
  font-weight: bold;
  border: none;
  width: 400px;
  margin: 10%;
  padding: 5% 2%;
  border-radius: 25px;
  cursor: pointer;
  text-align: center;

  &.correct {
    background-color: orange;
    animation: infinite 0.5s ${HeartBeatAnimation};
  }

  &.wrong {
    background-color: red;
    animation: infinite 1s ${HeadShakeAnimation};
  }

  &:disabled {
    color: rgb(0, 0, 0, 0.5);
  }
`

