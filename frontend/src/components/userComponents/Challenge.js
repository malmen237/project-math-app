import React from 'react';
import { useSelector } from 'react-redux';
import { API_URL } from 'utils/utils';

const Challenge = ({ opponent }) => {
  const user = useSelector((state) => state.user.id);

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

  fetch(API_URL('user'), options)
    .then((res) => res.json())
    .then((json) => {
      console.log('json.response', json.response)
    })

  return (
    <>
    </>
  )
}

export default Challenge;