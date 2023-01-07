import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';
// import { Player } from '@lottiefiles/react-lottie-player';
import picture from 'images/bells.png';
import { OuterWrapper } from '../styles/globalStyles';

const Welcome = () => {
  const navigate = useNavigate();
  const username = useSelector((store) => store.user.username);
  console.log(username)

  const trainButtonClick = () => {
    navigate('/category');
  }
  const gameButtonClick = () => {
    navigate('/game');
  }

  return (
    <OuterWrapper>
      <h1>Welcome, {username}</h1>
      {/* <Player
        src="https://assets10.lottiefiles.com/packages/lf20_jR229r.json"
        className="player"
        loop
        autoplay /> */}
      <Button onClick={trainButtonClick} type="button">
        <Img src={picture} alt="" />
        Start training session
      </Button>
      <Button onClick={gameButtonClick} type="button">
        <Img src={picture} alt="" />
        Play game
      </Button>
    </OuterWrapper>
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
  padding: 5% 2%;
  border-radius: 25px;
  cursor: pointer;
  text-align: center;
`

const Img = styled.img`
  width: 20%;
  height: auto;
  padding-bottom: 1%;
`
