import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { game } from 'reducers/game';
import styled from 'styled-components/macro';
import { OuterWrapper } from 'Styles/globalStyles';
// import Challenge from 'components/userComponents/Challenge';
import { API_URL } from 'utils/utils';

const StartGame = () => {
  const user = useSelector((state) => state.user.id);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onButtonClick = (event) => {
    // <Challenge opponent={event} />;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        opponent: event,
        user
      })
    }
    fetch(API_URL('gameChallengeUser'), options)
      .then((res) => res.json())
      .then((json) => {
        console.log('response', json.response)
        dispatch(game.actions.submitOpponent(json.response))
      })
    dispatch(game.actions.setMode('challenge'));
    setTimeout(() => { navigate('/questions') }, 500);
  }

  return (
    <OuterWrapper>
      <Choose>Challenge:</Choose>
      <ChoiceWrapper>
        {/* // TODO Add friend-ID to challenge friend */}
        <Choice type="button" onClick={() => onButtonClick()}>Friend</Choice>
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