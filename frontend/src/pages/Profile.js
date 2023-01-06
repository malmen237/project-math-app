import React from 'react';
import Statistics from 'userComponents/Statistics';
import styled from 'styled-components/macro';
import { OuterWrapper } from '../styles/globalStyles';

const Profile = () => {
  return (
    <OuterWrapper>
      <TiTle>All profile info</TiTle>
      <Statistics />
    </OuterWrapper>
  )
}

export default Profile;

const TiTle = styled.h1`
  font-size: 2rem;
  color: #555;
  margin: 2rem;
`