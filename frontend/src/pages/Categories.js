/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';
import { game } from 'reducers/game';
// import { OuterWrapper } from 'Styles/globalStyles';
import BackBtn from 'components/globalComponents/BackBtn';
import FadeInDownBig from 'Styles/FadeInDownBig';

// Rendered when user makes a choice do do a traning problem set
const Categories = () => {
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
    dispatch(game.actions.setMode('training'));
    dispatch(game.actions.submitCheck(true));
    dispatch(game.actions.submitOperation(event));
    setTimeout(() => { navigate('/questions') }, 500);
  }

  return (
    // <OuterWrapper>
    <>
      <BackBtn /><Choose>Pick your poison</Choose>
      <ChoiceWrapper>
        <FadeInDownBig duration="0.8s" delay="0.2s">
          <Choice type="button" onClick={() => onButtonClick('+')}>+</Choice>
          <Choice type="button" onClick={() => onButtonClick('-')}>-</Choice>
          <Choice type="button" onClick={() => onButtonClick('*')}>*</Choice>
          <Choice type="button" onClick={() => onButtonClick('/')}>/</Choice>
          <Choice type="button" onClick={() => onButtonClick('eq')}>Equations</Choice>
          <Choice type="button" onClick={() => onButtonClick('fr')}>Fractions</Choice>
        </FadeInDownBig>
      </ChoiceWrapper>
    </>
    // </OuterWrapper>
  )
}

export default Categories;

const ChoiceWrapper = styled.div`
  //display: flex;
  flex-direction: wrap;
  background: transparent;
`

const Choose = styled.p`
  font-size: 2rem;
  color: #555;
  margin-bottom: 1rem;
`

const Choice = styled.button`
  width: 12rem;
  background-color: #4EFA43;
  color: #666;
  border-radius: 15px;
  border: 3px solid #5093FA;
  font-weight: bold;
  font-size: 1.5rem;
  padding: 1rem;
  margin: 1rem;
  //display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`
