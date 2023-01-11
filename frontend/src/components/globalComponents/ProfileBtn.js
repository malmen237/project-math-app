import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';

const ProfileBtn = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate('/profile');
  }

  return (
    <ProfileButton type="button" className="back-btn" onClick={goBack}>
      Profile &gt;
    </ProfileButton>
  )
}

export default ProfileBtn;

const ProfileButton = styled.button`
  color: turquoise;
  background-color: transparent;
  border: none;
  padding: 2%;
  font-size: 2em;
`

