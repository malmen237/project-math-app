/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';
// import picture from 'images/bells.png';
import { Headline } from 'Styles/globalStyles';
import { API_URL } from 'utils/utils';
import ProfileBtn from 'components/globalComponents/ProfileBtn';
import { Devices, OuterWrapper } from '../Styles/globalStyles';

const Welcome = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');
  const username = localStorage.getItem('username');

  useEffect(() => {
    if (!accessToken) {
      navigate('/');
    }
  }, []);

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

  const trainButtonClick = () => {
    navigate('/category');
  }
  const gameButtonClick = () => {
    navigate('/game');
  }

  return (
    <OuterWrapper>
      <WelcomeWrapper>
        <Headline>Welcome, {username}!</Headline>
        <ProfileBtn />
        <Button onClick={trainButtonClick} type="button">
          {/* <Img src={picture} alt="" /> */}
        Start training session
        </Button>
        <Button onClick={gameButtonClick} type="button">
          {/* <Img src={picture} alt="" /> */}
        Play game
        </Button>
      </WelcomeWrapper>
    </OuterWrapper>
  )
}
export default Welcome;

const Button = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #43fada;
  color: #555;
  font-size: 1.5em;
  font-weight: bold;
  border: none;
  width: 315px;
  margin: 10% 0;
  padding: 5% 2%;
  border-radius: 25px;
  cursor: pointer;
  text-align: center;
`

const WelcomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 80vw;
  margin: 5rem auto;

  @media ${Devices.tablet} {
    width: 65vw;
  }

  @media ${Devices.laptop} {
    width: 40vw;
  }

  @media ${Devices.desktop} {
    width: 50vw;
  }
`
// const Img = styled.img`
// width: 20%;
// height: auto;
// padding-bottom: 1%;
// `

