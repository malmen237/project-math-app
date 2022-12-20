import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { game } from 'reducers/game';

const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onButtonClick = (event) => {
    dispatch(game.actions.submitOperation(event));
    setTimeout(() => { navigate('/questions') }, 500);
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