import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { game } from 'reducers/game';

const Categories = () => {
  const [operation, setOperation] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log('operation:', operation)

  const onButtonClick = (event) => {
    setOperation(event);
    dispatch(game.actions.submitOperation(operation));
    setTimeout(() => { navigate('/questions') }, 1000);
  }

  return (
    <>
      <p>Choose your poison</p>
      <button type="button" onClick={() => onButtonClick('+')}>+</button>
      <button type="button" onClick={() => onButtonClick('-')}>-</button>
      <button type="button" onClick={() => onButtonClick('*')}>*</button>
      <button type="button" onClick={() => onButtonClick('/')}>/</button>
    </>
  )
}

export default Categories;