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
  background-image: linear-gradient( 109.6deg,  rgba(24,138,141,1) 11.2%, rgba(96,221,142,1) 91.1% );
  /* background-color: #80D0C7;
  background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%); */
`

const LogOutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  background-color: #256883;
  // background-image: radial-gradient( circle farthest-corner at 10% 20%,  rgba(251,233,169,1) 0%, rgba(246,158,29,0.93) 90% );
  opacity: 0.8;
  width: 50%;
  padding: 5%;
  border-radius: 15px 120px;
  box-shadow: 10px 5px 5px;
  

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
  color: whitesmoke;
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

