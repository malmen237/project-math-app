import React from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <OuterWrapper>
      <Found>
        Page Not Found...
      </Found>
      <LinkWrapper>
        <Link to="/login"> GO TO LOGIN</Link>
      </LinkWrapper>
    </OuterWrapper>
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
const OuterWrapper = styled.div`
  //background-color: white;
  //background-color: blue;
  background: rgb(250,23,156);
  background: linear-gradient(0deg, rgba(250,23,156,1) 0%, rgba(80,147,250,1) 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  //width: 100vw;
  height: 100vh;
  //margin: 2rem auto;
  `
const Found = styled.div`
  font-weight: bold;
  font-size: 2rem;
  color: #34495E;
  margin-bottom: 1rem;
`

