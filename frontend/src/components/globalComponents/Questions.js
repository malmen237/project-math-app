/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_URL } from 'utils/utils';
import { game } from 'reducers/game';
import { headShake, pulse } from 'react-animations';
import styled, { keyframes } from 'styled-components/macro';
import { useMultiDrop } from 'react-dnd-multi-backend';
import DnDForm from 'components/dndComponents/DnDForm';
import Timer from './Timer';
import TextForm from './TextForm';
import { Devices } from '../../Styles/globalStyles';
import SingleQuestion from './SingleQuestion';

const HeadShakeAnimation = keyframes`${headShake}`;
const HeartBeatAnimation = keyframes`${pulse}`;

const Questions = () => {
  const [answer, setAnswer] = useState('');
  const [nextButton, setNextButton] = useState(false);
  const [providedAnswer, setProvidedAnswer] = useState(false);
  const [time, setTime] = useState(0);
  const [basket, setBasket] = useState([]);
  const [showNumber, setShowNumber] = useState(0);
  const [lastQuestion, setLastQuestion] = useState();
  const [startFetch, setStartFetch] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Authenticate user
  const accessToken = localStorage.getItem('accessToken');
  useEffect(() => {
    if (!accessToken) {
      navigate('/');
    }
  }, [accessToken]);

  const operation = useSelector((state) => state.game.operation);
  const setNumber = useSelector((state) => state.game.setNumber);
  const problem = useSelector((state) => state.game.questions);
  const problemNumber = useSelector((state) => state.game.currentProblemIndex);
  setTimeout(() => { setShowNumber(problemNumber) }, 2000);
  const trainingOver = useSelector((state) => state.game.gameOver);
  setTimeout(() => { setLastQuestion(trainingOver) }, 2000);
  const isAnswerCorrect = useSelector((state) => state.game.isCorrect);
  const mode = useSelector((state) => state.game.mode);
  const check = useSelector((state) => state.game.check);
  const opponent = useSelector((state) => state.game.opponent);
  const user = useSelector((state) => state.user.id);

  // Called when an answer is dragged to a drop area
  const addAnswerToBasket = (givenAnswer) => {
    const selected = givenAnswer;
    setAnswer(givenAnswer);
    setBasket([selected]);
    setNextButton(true);
  }

  const [[dropProps], {
    html5: [html5Props, html5Drop],
    touch: [touchProps, touchDrop]
  }] = useMultiDrop({
    accept: 'card',
    drop: (item) => addAnswerToBasket(item.answer),
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  });

  const html5DropStyle = { backgroundColor: (dropProps.isOver && html5Props.canDrop) ? '#f3f3f3' : 'lightcoral' }
  const touchDropStyle = { backgroundColor: (touchProps.isOver && touchProps.canDrop) ? '#f3f3f3' : 'lightcoral' }

  // Function that start's the counter to a 1 second interval
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((t) => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Start timer when user begins a problem set
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
    setTimeout(() => { dispatch(game.actions.goToNextQuestion()) }, 2000);
    setTimeout(() => { setProvidedAnswer(false) }, 2000);
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
      setTimeout(() => { navigate('/summary') }, 2000);
    }
  }

  const handleUserAnswerInput = (event) => {
    setAnswer(event.target.value);
    setNextButton(true);
  }

  // Get set of questions from database
  useEffect(() => {
    if (startFetch && check) {
      setStartFetch(false);
      setProvidedAnswer(false);
      // To post type of math problems to be trained
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: accessToken
        },
        body: JSON.stringify({
          operation,
          setNumber,
          opponent,
          user
        })
      }
      fetch(API_URL(mode === 'challenge' ? 'challenges' : 'questions'), options)
        .then((res) => res.json())
        .then((json) => {
          dispatch(game.actions.submitQuestion(json.response.questions));
        })
    }
  }, [startFetch]);

  if (problem.length === 0) {
    return (
      <>
      </>
    );
  }

  let formInput;
  if (problem[problemNumber].operation === '+' || problem[problemNumber].operation === '-' || problem[problemNumber].operation === '*' || problem[problemNumber].operation === '/') {
    formInput = true;
  } else {
    formInput = false;
  }

  return (
    <QuestionWrapper>
      {mode === 'challenge' ? <ChallengeText>You are challenging {opponent}</ChallengeText> : ''}
      <SingleQuestion problem={problem[problemNumber].question} operation={problem[problemNumber].operation} />
      <Form onSubmit={onFormSubmit} autoComplete="off">
        {formInput ? <TextForm
          answer={answer}
          handleUserAnswerInput={handleUserAnswerInput} /> : <DnDForm
          basket={basket}
          html5DropStyle={html5DropStyle}
          html5Drop={html5Drop}
          touchDropStyle={touchDropStyle}
          touchDrop={touchDrop}
          problem={problem[problemNumber]} />}
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
      </Form>
      <Timer time={time} />
      <Number>Question number {showNumber + 1}</Number>
    </QuestionWrapper>
  );
}

export default Questions;

const ChallengeText = styled.p`
  font-size: 1rem;
  color: white;
  padding-bottom: 2%;
`

const QuestionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 80vw;
  margin: 5rem auto;

  @media ${Devices.tablet} {
    width: 65vw;
  }

  @media ${Devices.laptop} {
    width: 40vw;
  }

  @media ${Devices.desktop} {
    width: 50vw;
  }
`

const Form = styled.form`
  width: 100%;

  @media ${Devices.tablet} {
    width: 65%;
  }

  @media ${Devices.laptop} {
    width: 80%;
  }

  @media ${Devices.desktop} {
    width: 50%;
  }
`

const Number = styled.h1`
  font-size: 1.3rem;
  color: white;
  margin: 1rem;
`

const Button = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: lightblue;
  color: white;
  font-size: 1.5em;
  font-weight: bold;
  border: none;
  width: 90%;
  margin: 5% auto;
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
    border: 2px solid #555;
    background-color: red;
    color: white;
    animation: infinite 1s ${HeadShakeAnimation};
  }

  &:disabled {
    color: rgb(0, 0, 0, 0.2);
  }
`