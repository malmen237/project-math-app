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
  // background-color: beige;
  background-color:  #0093E9;
  background-image: linear-gradient(160deg, #80D0C7 0%, #0093E9 100%);
  // background-color:  #F8CAB8;
  // background-image: linear-gradient(160deg, beige 0%, #F8CAB8 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`