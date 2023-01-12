import React from 'react';
import Statistics from 'components/userComponents/Statistics';
import styled from 'styled-components/macro';
import { OuterWrapper, Devices } from 'Styles/globalStyles';
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

const ProfileWrapper = styled(OuterWrapper)`
  // border: 2px solid red;
  @media ${Devices.tablet} {
    width: 70vw;
  }

  @media ${Devices.desktop} {
    width: 50vw;
  }
`