import React from 'react';
import Statistics from 'components/userComponents/Statistics';
// import styled from 'styled-components/macro';
// import { OuterWrapper, Devices } from 'Styles/globalStyles';
import Challenge from 'components/userComponents/Challenge';
import BackBtn from 'components/globalComponents/BackBtn';

// Rendered as a profile page
const Profile = () => {
  return (
    <>
      <BackBtn />
      <Challenge />
      <Statistics />
    </>
  )
}

export default Profile;