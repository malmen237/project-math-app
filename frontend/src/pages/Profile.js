import React from 'react';
import Statistics from 'components/userComponents/Statistics';
import styled from 'styled-components/macro';
import Challenge from 'components/userComponents/Challenge';
import BackBtn from 'components/globalComponents/BackBtn';

// Rendered as a profile page
const Profile = () => {
  return (
    <ProfileWrapper>
      <BackBtn />
      <Challenge />
      <Statistics />
    </ProfileWrapper>
  )
}

export default Profile;

const ProfileWrapper = styled.div`
  color: white;
  background-color: beige;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-top: 2rem;
  min-height: 110vh;
  width: 100vw;
`