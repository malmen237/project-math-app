/* eslint-disable react/jsx-indent-props */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { game } from 'reducers/game';
import { headShake, pulse } from 'react-animations';
import styled, { keyframes } from 'styled-components/macro';
import { useMultiDrop } from 'react-dnd-multi-backend';
import DnDForm from 'dndComponents/DnDForm';
import Timer from './Timer';
import TextForm from './TextForm';
import { OuterWrapper } from '../styles/globalStyles';

const HeadShakeAnimation = keyframes`${headShake}`;
const HeartBeatAnimation = keyframes`${pulse}`;

const Training = () => {
  const [answer, setAnswer] = useState('');
  const [nextQuestion, setNextQuestion] = useState(true);
  const [nextButton, setNextButton] = useState(false);
  const [providedAnswer, setProvidedAnswer] = useState(false);
  const [time, setTime] = useState(0);
  const [formInput, setFormInput] = useState(true);
  const [basket, setBasket] = useState([]);
  const [showNumber, setShowNumber] = useState(0);
  const [lastQuestion, setLastQuestion] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const operation = useSelector((state) => state.game.operation);
  const setNumber = useSelector((state) => state.game.setNumber);
  const problem = useSelector((state) => state.game.questions);
  const isAnswerCorrect = useSelector((state) => state.game.isCorrect);
  // ADDED:
  const problemNumber = useSelector((state) => state.game.currentProblemIndex);
  setTimeout(() => { setShowNumber(problemNumber) }, 2000);
  // ADDED:
  const trainingOver = useSelector((state) => state.game.gameOver);
  setTimeout(() => { setLastQuestion(trainingOver) }, 2000);

  const addAnswerToBasket = (name) => {
    const selected = name
    setAnswer(name)
    setBasket([selected])
    setNextButton(true);
  }

  // eslint-disable-next-line max-len
  const [[dropProps], { html5: [html5Props, html5Drop], touch: [touchProps, touchDrop] }] = useMultiDrop({
    accept: 'card',
    // drop is a callback function, triggers with every drop, receives data from item in useDrag
    // adds the item to the basket array
    drop: (item) => addAnswerToBasket(item.name),
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  })

  // DROPPROPS - Where should it be used??
  const html5DropStyle = { backgroundColor: (dropProps.isOver && html5Props.canDrop) ? '#f3f3f3' : '#bbbbbb' } // (html5Props.isOver && html5Props.canDrop)
  const touchDropStyle = { backgroundColor: (touchProps.isOver && touchProps.canDrop) ? '#f3f3f3' : 'lightcoral' } // (touchProps.isOver && touchProps.canDrop)

  // Function that start's the counter to a 1 second interval
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((t) => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // MOVED TIMER INTO SEPARATE USE-EFFECT
  useEffect(() => {
    setTime(0);
    <Timer />
  }, []);

  // Function that activates when user enters an answer,
  // also resets the goToNextQuestion-state hook
  const moveToNext = () => {
    dispatch(game.actions.submitAnswer(answer));
    setAnswer('');
    setBasket([]);
    setProvidedAnswer(true);
    dispatch(game.actions.goToNextQuestion());
    setTimeout(() => { setNextQuestion(true) }, 2000);
    setNextButton(false);
  }

  const onFormSubmit = (event) => {
    event.preventDefault();
    if (!trainingOver) {
      moveToNext();
    } else {
      dispatch(game.actions.submitTime(time));
      dispatch(game.actions.submitAnswer(answer));
      setProvidedAnswer(true);
      setTimeout(() => { setNextQuestion(true) }, 2000);
      setTimeout(() => { navigate('/summary') }, 2000);
    }
  }

  const handleUserAnswerInput = (event) => {
    setAnswer(event.target.value);
    setNextButton(true);
  }

  // Get set of questions from database
  useEffect(() => {
    if (nextQuestion) {
      setNextQuestion(false);
      setProvidedAnswer(false);
      // To post type of math problems to be trained
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          operation,
          setNumber
        })
      }
      fetch('http://localhost:8080/questions', options)
        .then((res) => res.json())
        .then((json) => {
          console.log('json.response', json.response)
          dispatch(game.actions.submitQuestion(json.response));
          if (operation === '+' || operation === '-' || operation === '*' || operation === '/') {
            return setFormInput(true)
          } else if (operation === 'eq' || operation === 'fr') {
            return setFormInput(false)
          }
        })
    }
  }, [nextQuestion]);

  return (
    <OuterWrapper>
      <Question>Question: {problem.question}</Question>
      <form onSubmit={onFormSubmit}>
        {formInput ? <TextForm
          answer={answer}
          handleUserAnswerInput={handleUserAnswerInput} /> : <DnDForm
          basket={basket}
          html5DropStyle={html5DropStyle}
          html5Drop={html5Drop}
          touchDropStyle={touchDropStyle}
          touchDrop={touchDrop}
          problem={problem} />}
        {!lastQuestion && (
          <Button
            className={providedAnswer ? (isAnswerCorrect ? 'correct' : 'wrong') : 'default'}
            type="submit"
            disabled={!nextButton}
            onClick={onFormSubmit}>
            Next
          </Button>
        )}
        {lastQuestion && (
          <Button
            className={providedAnswer ? (isAnswerCorrect ? 'correct' : 'wrong') : 'default'}
            type="submit"
            disabled={!nextButton}
            onClick={onFormSubmit}>
            Submit
          </Button>
        )}
      </form>
      <Timer time={time} />
      <Number>Question number {showNumber + 1}</Number>
    </OuterWrapper>
  );
}

export default Training;

const Question = styled.h1`
  width: 90vw;
  font-size: 1.5rem;
  color: #555;
`

const Number = styled.h1`
  font-size: 1.3rem;
  color: #555;
  margin: 1rem;
`

const Button = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: lightblue;
  color: white;
  font-size: 1.5em;
  font-weight: bold;
  border: none;
  width: 70vw;
  margin: 10% 0;
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

