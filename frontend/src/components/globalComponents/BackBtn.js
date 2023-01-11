import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';

const BackBtn = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate('/welcome');
  }

  return (
    <BackButton type="button" className="back-btn" onClick={goBack}>
      ↩️
    </BackButton>
  )
}

export default BackBtn;

const BackButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 2%;
  font-size: 2em;
  filter: grayscale(100%);
`

