import React from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
      <Found>
       Page Not Found...
      </Found>
      <LinkWrapper>
        <Link to="/login"> GO TO LOGIN</Link>
      </LinkWrapper>
    </>
  )
}

export default NotFound;

const LinkWrapper = styled.div`
  width: 12rem;
  background-color: #4EFA43;
  color: #666;
  border-radius: 15px;
  border: 3px solid #5093FA;
  font-weight: bold;
  font-size: 1.5rem;
  padding: 1rem;
  margin: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  `

const Found = styled.div`
  font-weight: bold;
  font-size: 2rem;
  color: #34495E;
  margin-bottom: 1rem;
`
