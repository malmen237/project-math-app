/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { game } from 'reducers/game';
import { headShake, pulse } from 'react-animations';
import styled, { keyframes } from 'styled-components/macro';
import Timer from './Timer';

const HeadShakeAnimation = keyframes`${headShake}`;
const HeartBeatAnimation = keyframes`${pulse}`;

const Training = () => {
  const [answer, setAnswer] = useState('');
  const [nextQuestion, setNextQuestion] = useState(true);
  const [nextButton, setNextButton] = useState(false);
  const [providedAnswer, setProvidedAnswer] = useState(false);
  const [time, setTime] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const operation = useSelector((state) => state.game.operation);
  const problem = useSelector((state) => state.game.questions);
  const problemNumber = useSelector((state) => state.game.currentProblemIndex);
  const trainingOver = useSelector((state) => state.game.gameOver);
  const isAnswerCorrect = useSelector((state) => state.game.isCorrect);

  // Function that start's the counter to a 1 second interval
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((t) => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  console.log(problem)

  // Function that activates when user enters an answer,
  // also resets the goToNextQuestion-state hook
  const moveToNext = () => {
    dispatch(game.actions.submitAnswer(answer));
    setAnswer('');
    setProvidedAnswer(true);
    dispatch(game.actions.goToNextQuestion());
    setTimeout(() => { setNextQuestion(true) }, 2000);
    setNextButton(false);
  }

  const onFormSubmit = (event) => {
    const { keyCode } = event;

    if (keyCode === 13 && !trainingOver) {
      moveToNext(event);
    } else if (keyCode === 13 && trainingOver) {
      navigate('/summary');
    } else {
      event.preventDefault();
    }
  }

  // Enables the user to use the enter-key to progress.
  const onKeyDown = (event) => {
    const { keyCode } = event;

    if (keyCode === 13 && !trainingOver) {
      moveToNext();
    } else if (keyCode === 13 && trainingOver) {
      onFormSubmit(event);
    }
  }

  const handleUserAnswerInput = (event) => {
    setAnswer(event.target.value);
    setNextButton(true);
  }

  // Get set of questions from database
  useEffect(() => {
    if (nextQuestion) {
      setTime(0);
      <Timer />
      // counter();
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
    }
  }, [nextQuestion]);

  return (
    <>
      <h1>Question: {problem.question}</h1>
      <form onSubmit={onFormSubmit}>
        <input
          type="text"
          id="question"
          placeholder="Answer"
          value={answer}
          onChange={(event) => handleUserAnswerInput(event)}
          onKeyDown={(event) => onKeyDown(event)} />
        {!trainingOver && (
          <Button
            className={providedAnswer ? (isAnswerCorrect ? 'correct' : 'wrong') : 'default'}
            onClick={moveToNext}
            disabled={!nextButton}
            type="button">Next
          </Button>
        )}
        {trainingOver && (
          <Button
            className={providedAnswer ? (isAnswerCorrect ? 'correct' : 'wrong') : 'default'}
            type="submit"
            disabled={!nextButton}
            onClick={(event) => onFormSubmit(event)}>
              Submit
          </Button>
        )}
      </form>
      <Timer time={time} />
      <p>Question number {problemNumber + 1}</p>
    </>
  );
}

export default Training;

const Button = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: lightblue;
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
    background-color: lightgreen;
    color: white;
    animation: infinite 0.5s ${HeartBeatAnimation};
  }

  &.wrong {
    background-color: red;
    color: white;
    animation: infinite 1s ${HeadShakeAnimation};
  }

  &:disabled {
    color: rgb(0, 0, 0, 0.2);
  }
`

