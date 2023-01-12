/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { game } from 'reducers/game';
import { API_URL } from 'utils/utils';
import styled from 'styled-components/macro';
import { Devices } from 'Styles/globalStyles';

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
        json.response.map((singleChallenge) => {
          return (singleChallenge.opponentId === userid ? renderChallenge(singleChallenge) : '')
        })
      })
  }, [])

  if (challengePresent === false) {
    return (
      <Wrapper>
        <Headline>Sorry, {username}.</Headline>
        <Headline>You don&apos;t have any challenges right now!</Headline>
      </Wrapper>
    )
  } else {
    return (
      <Wrapper>
        <Headline>Ok, {username}</Headline>
        <Headline>You have a challenge from {challenger}</Headline>
        <Choice type="button" onClick={() => onButtonClick()}>Let&apos;s play!</Choice>
      </Wrapper>
    )
  }
}

export default Challenge;

const Headline = styled.h1`
  width: 90%;
  font-size: 1.5rem;
  font-weight: bold;
  color: #555;
  margin-bottom: 1rem;

  @media ${Devices.desktop} {
    width: 50%;
    margin-bottom: 2rem;
  }
`
const Wrapper = styled.div`
  color: #555;
  background-color: beige;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100vw;
`

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