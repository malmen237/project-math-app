import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';
// import { Player } from '@lottiefiles/react-lottie-player';
import picture from 'images/bells.png';
import { OuterWrapper } from 'Styles/globalStyles';
import { API_URL } from 'utils/utils';

const Welcome = () => {
  const navigate = useNavigate();

  // const accessToken = useSelector((store) => store.user.accessToken);
  // const username = useSelector((store) => store.user.username);
  const accessToken = localStorage.getItem('accessToken');
  const username = localStorage.getItem('username');

  useEffect(() => {
    if (!accessToken) {
      navigate('/');
    }
  }, [accessToken]);

  const authOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: accessToken
    }
  }

  useEffect(() => {
    fetch(API_URL('welcome'), authOptions)
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const buttonClick = () => {
    navigate('/profile');
  }
  const trainButtonClick = () => {
    navigate('/category');
  }
  const gameButtonClick = () => {
    navigate('/game');
  }

  return (
    <OuterWrapper>
      <h1>Welcome, {username}</h1>
      <button type="button" onClick={buttonClick}>PROFILE</button>
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

