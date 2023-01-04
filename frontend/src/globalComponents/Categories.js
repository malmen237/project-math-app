import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';
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
      <ChoiceWrapper>
        <Choice type="button" onClick={() => onButtonClick('+')}>+</Choice>
        <Choice type="button" onClick={() => onButtonClick('-')}>-</Choice>
        <Choice type="button" onClick={() => onButtonClick('*')}>*</Choice>
        <Choice type="button" onClick={() => onButtonClick('/')}>/</Choice>
        <Choice type="button" onClick={() => onButtonClick('eq')}>Equations</Choice>
        <Choice type="button" onClick={() => onButtonClick('fr')}>Fractions</Choice>
      </ChoiceWrapper>
    </>
  )
}

export default Categories;

const ChoiceWrapper = styled.div`
  display: flex;
`
const Choice = styled.button`
  width: 5rem;
  padding: 1 rem;
  margin: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`