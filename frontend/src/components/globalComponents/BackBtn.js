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
        {' <'}{'<'}
      </BackButton>
    </BounceInLeft>

  )
}

export default BackBtn;

const BackButton = styled.button`
  background-color: green;
  opacity: 0.6;
  color: white;
  border: none;
  padding: 15%;
  font-size: 3em;
  margin: 3rem 0;
  border-radius: 50%;
  cursor: pointer;
`