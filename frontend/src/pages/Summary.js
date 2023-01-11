import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { OuterWrapper } from 'Styles/globalStyles';
import ProfileBtn from 'components/globalComponents/ProfileBtn';
import { OuterWrapper } from '../styles/globalStyles';

const Summary = () => {
  const navigate = useNavigate();

  const onTrainBtnClick = (type) => {
    // dispatch(game.actions.submitOperation());
    if (type === 'training') {
      setTimeout(() => { navigate('/category') }, 500);
    } else {
      setTimeout(() => { navigate('/game') }, 500);
    }
  }

  // Convert seconds to minutes and seconds
  const toHoursAndMinutes = (totalSecs) => {
    const totalMinutes = Math.floor(totalSecs / 60);
    const remainingSecs = totalSecs % 60;
    return { m: totalMinutes, s: remainingSecs }
  }

  // Adds a zero before number if it's single digits
  const paddedNumber = (number, length) => {
    let str = `${number}`;
    while (str.length < length) {
      str = `0${str}`;
    }
    return str;
  }

  // Display users results
  const username = useSelector((state) => state.user.username);
  const matchId = useSelector((state) => state.game.matchId)
  const quiztype = useSelector((state) => state.game.mode);
  const category = useSelector((state) => state.game.operation);
  const quiztype = useSelector((state) => state.game.quiztype);
  const score = useSelector((state) => state.game.correctAnswers);
  const points = useSelector((state) => state.game.userPoints);
  const timeInSecs = useSelector((state) => state.game.time);
  const timeConverted = toHoursAndMinutes(timeInSecs)
  const time = `${paddedNumber(timeConverted.m, 2)}:${paddedNumber(timeConverted.s, 2)}`
  // console.log('time in summary', time, typeof time)
  const opponent = useSelector((state) => state.game.opponent);
  console.log(matchId)

  // Post users results to database
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      quiztype,
      score,
      points,
      time,
      opponent,
      matchId
    })
  }

  fetch('http://localhost:8080/userstats', options)
    .then((res) => res.json())
    .then((json) => {
      console.log('json.response', json.response);
    })

  return (
    <OuterWrapper>
      <Correct>WooooHoooooooooo {username}</Correct>
      <Correct>You got {score} / 10 right!</Correct>
      <Correct>{points} points earned</Correct>
      <Correct>Time to complete: {time}</Correct>

      <Next type="button" onClick={() => onTrainBtnClick('training')}>Train your skills</Next>
      <Next type="button" onClick={() => onTrainBtnClick('challenge')}>Challenge someone!</Next>

      <ProfileBtn />
    </OuterWrapper>
  )
}

export default Summary;

const Correct = styled.p`
  font-size: 2rem;
  color: #555;
  margin-bottom: 1rem;
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