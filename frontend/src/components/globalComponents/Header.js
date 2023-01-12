/* eslint-disable indent */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import user from 'reducers/user';
import styled from 'styled-components/macro';
import { Devices } from '../../Styles/globalStyles';

const Header = () => {
  const username = localStorage.getItem('username');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const redirectHome = () => {
    navigate('/welcome');
  }

  const logOut = () => {
    dispatch(user.actions.logOut())
    localStorage.removeItem('accessToken');
    localStorage.removeItem('username');
    navigate('/');
  }

  return (
    <HeaderWrapper>
      <HomeBtn onClick={redirectHome} type="button">
        Mathorama
      </HomeBtn>
      <LogOutWrapper>
        {username === null ? <MirrorText>amarohtaM</MirrorText>
        : <>
            <UserInfoText>Username: {username}</UserInfoText>
            <LogOutBtn onClick={logOut} type="button">
            Log Out
            </LogOutBtn>
          </>}
      </LogOutWrapper>
    </HeaderWrapper>
  )
}

export default Header;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 15px 10px 10px;
  background-color: #FACE75;
  opacity: 0.9;
`

const LogOutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  background-color: #555;
  opacity: 0.8;
  width: 50%;
  padding: 5%;
  border-radius: 15px 35px;
  

  @media ${Devices.tablet} {
    display: flex;
  }
  @media ${Devices.laptop} {
    padding: 2%;
    font-size: larger;
  }
`

const UserInfoText = styled.p`
  color: white;
`

const MirrorText = styled.p`
  color: white;
  font-size: 1.5em;
  font-weight: bold;
  padding: 2%;
`

const HomeBtn = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: transparent;
  color: #333;
  font-size: 1.5em;
  font-weight: bold;
  border: none;
  width: 150px;
  margin: 2%;
  padding: 1% 2%;
  cursor: pointer;
  text-align: center;
`

const LogOutBtn = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: none;
  color: black;
  font-size: 0.8em;
  font-weight: bold;
  border: double gray;
  border-radius: 25px;
  width: 100px;
  margin-top: 2%;
  padding: 1% 2%;
  cursor: pointer;
  text-align: center;
`

