/* eslint-disable indent */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import user from 'reducers/user';
import styled from 'styled-components/macro';

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
`

const LogOutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  background-color: black;
  width: 50%;
  padding: 2%;
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
  color: black;
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

