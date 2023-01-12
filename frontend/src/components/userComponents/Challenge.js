/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { game } from 'reducers/game';
import { API_URL } from 'utils/utils';
import styled from 'styled-components/macro';

const Challenge = () => {
  const [challengePresent, setChallengePresent] = useState(false)

  const username = useSelector((state) => state.user.username);
  const userid = useSelector((state) => state.user.id);
  const challenger = useSelector((state) => state.game.opponent);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Authenticate user
  const accessToken = localStorage.getItem('accessToken');
  useEffect(() => {
    if (!accessToken) {
      navigate('/');
    }
  }, []);

  const onButtonClick = () => {
    setTimeout(() => { navigate('/questions') }, 500);
  }

  const renderChallenge = (challengeInfo) => {
    setChallengePresent(true)
    dispatch(game.actions.submitOpponent(challengeInfo.username))
    dispatch(game.actions.submitQuestion(challengeInfo.questions))
    dispatch(game.actions.submitMatchId(challengeInfo.id))
    dispatch(game.actions.setMode('challenge'))
    dispatch(game.actions.submitCheck(false))
  }

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      }
    }
    fetch(API_URL(`challenges/${userid}`), options)
      .then((res) => res.json())
      .then((json) => {
        console.log('LINDA-current id', userid)
        json.response.map((singleChallenge) => {
          // console.log('LINDA-backend challenge', singleChallenge.opponentId)
          // console.log('Is there a challenge?', singleChallenge.opponentId === userid)
          return (singleChallenge.opponentId === userid ? renderChallenge(singleChallenge) : '')
        })
      })
  }, [])

  if (challengePresent === false) {
    return (
      <>
        <p>Sorry, {username}.</p>
        <p>You don&apos;t have any challenges right now!</p>
      </>
    )
  } else {
    return (
      <>
        <p>Ok, {username}</p>
        <p>You have a challenge from {challenger}</p>
        <Choice type="button" onClick={() => onButtonClick()}>Let&apos;s play!</Choice>
      </>
    )
  }
}

export default Challenge;

const Choice = styled.button`
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