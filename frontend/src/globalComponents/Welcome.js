import React from 'react';
import { useNavigate } from 'react-router-dom';
import { headShake } from 'react-animations';
import styled, { keyframes } from 'styled-components/macro';
import picture from 'images/bells.png';

const HeadShakeAnimation = keyframes`${headShake}`;

const Welcome = () => {
  const navigate = useNavigate();

  const trainButtonClick = () => {
    navigate('/');
  }
  const gameButtonClick = () => {
    navigate('/');
  }

  return (
    <div>
      <HeadShakeDiv>
        <Button onclick={trainButtonClick} type="button">
          <Img src={picture} alt="" />
        Start training session
        </Button>
      </HeadShakeDiv>
      <Button onclick={gameButtonClick} type="button">
        Play game
      </Button>
    </div>
  )
}
export default Welcome;

const Button = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: green;
  color: white;
  font-size: 1.5em;
  font-weight: bold;
  border: none;
  width: 400px;
  margin: 10%;
  padding: 10% 2%;
  border-radius: 25%;
  cursor: pointer;
  text-align: center;
`

const Img = styled.img`
  width: 20%;
  height: auto;
`

const HeadShakeDiv = styled.div`
  animation: infinite 2s ${HeadShakeAnimation};
`;