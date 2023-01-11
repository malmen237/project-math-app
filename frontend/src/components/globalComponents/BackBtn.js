import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';
import BounceInLeft from 'Styles/BounceInLeft';

const BackBtn = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate('/welcome');
  }

  return (
    <BounceInLeft duration="0.8s" delay="0.2s">
      <BackButton type="button" className="back-btn" onClick={goBack}>
      ↩️
      </BackButton>
    </BounceInLeft>
  )
}

export default BackBtn;

const BackButton = styled.button`
  background-color: #4EFA43;
  border: none;
  padding: 3%;
  font-size: 3em;
  border-radius: 15px;
  //filter: grayscale(100%);
`

