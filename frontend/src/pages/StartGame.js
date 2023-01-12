/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { game } from 'reducers/game';
import styled from 'styled-components/macro';
import { OuterWrapper } from 'Styles/globalStyles';
import BackBtn from 'components/globalComponents/BackBtn';
import { API_URL } from 'utils/utils';

// Rendered when user makes a choice do a challenge another user
const StartGame = () => {
  const userId = useSelector((state) => state.user.id);
  const username = useSelector((state) => state.user.username);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Authenticate user
  const accessToken = localStorage.getItem('accessToken');
  useEffect(() => {
    if (!accessToken) {
      navigate('/');
    }
  }, []);

  const onButtonClick = (event) => {
    dispatch(game.actions.restart());
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      },
      body: JSON.stringify({
        opponent: event,
        userId,
        username
      })
    }
    fetch(API_URL('challenges'), options)
      .then((res) => res.json())
      .then((json) => {
        dispatch(game.actions.submitOpponent(json.response.opponentusername))
        dispatch(game.actions.submitQuestion(json.response.questions))
        dispatch(game.actions.submitMatchId(json.response.id))
        dispatch(game.actions.submitCheck(false))
      })
    dispatch(game.actions.setMode('challenge'));
    setTimeout(() => { navigate('/questions') }, 500);
  }

  return (
    <OuterWrapper>
      <BackBtn />
      <Choose>Challenge:</Choose>
      <ChoiceWrapper>
        {/* // TODO Connect the Friend-List */}
        <Choice type="button">Friend</Choice>
        <Choice type="button" onClick={() => onButtonClick('random')}>Random</Choice>
      </ChoiceWrapper>
    </OuterWrapper>
  )
}

export default StartGame;

const ChoiceWrapper = styled.div`
  display: flex;
  flex-direction: wrap;
`

const Choose = styled.p`
  font-size: 2rem;
  color: #555;
  margin-bottom: 1rem;
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
