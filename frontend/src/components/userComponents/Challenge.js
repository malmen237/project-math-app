import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { game } from 'reducers/game';
import { API_URL } from 'utils/utils';

const Challenge = ({ opponent }) => {
  const user = useSelector((state) => state.user.id);

  const dispatch = useDispatch();

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      opponent,
      user
    })
  }

  fetch(API_URL('gameChallengeUser'), options)
    .then((res) => res.json())
    .then((json) => {
      console.log('response', json.response)
      dispatch(game.actions.submitOpponent(json.response))
    })

  return (
    <>
    </>
  )
}

export default Challenge;