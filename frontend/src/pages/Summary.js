import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { OuterWrapper } from '../Styles/globalStyles';

const Summary = () => {
  // const dispatch = useDispatch(); useDispatch,
  const navigate = useNavigate();

  const onTrainBtnClick = (type) => {
    // dispatch(game.actions.submitOperation());
    if (type === 'train') {
      setTimeout(() => { navigate('/category') }, 500);
    // } else {
    //   setTimeout(() => { navigate('/questions') }, 500);
    // }
    }
  }

  // Check how many correct answers the user has
  const correctAnswers = useSelector((state) => state.game.correctAnswers);
  const userPoints = useSelector((state) => state.game.userPoints);

  return (
    <OuterWrapper>
      <Correct>WooooHoooooooooo</Correct>
      <Correct>You got {correctAnswers} / 10 right!</Correct>
      <Points>{userPoints} points earned</Points>

      <Next type="button" onClick={() => onTrainBtnClick('train')}>Train again?</Next>
      <Next type="button" onClick={() => onTrainBtnClick('game')}>Start a game!</Next>
    </OuterWrapper>
  )
}

export default Summary;

const Correct = styled.p`
  font-size: 2rem;
  color: #555;
  margin-bottom: 1rem;
`

const Points = styled.p`
  font-size: 2rem;
  color: #555;
`

const Next = styled.button`
  width: 12rem;
  background-color: #F7DD65;
  color: #666;
  border-radius: 15px;
  border: 3px solid #5DB0B2;
  font-weight: bold;
  font-size: 1.5rem;
  padding: 1rem;
  margin: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`