import React from 'react';
import styled from 'styled-components/macro';
import { Devices } from '../../Styles/globalStyles'

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>Developed and designed by</FooterText>
      <LinkContainer>
        <Link
          href="https://www.linkedin.com/in/linda-malm-7aa8866b/"
          target="_blank">Linda Malm
        </Link>
        <Link
          href="https://www.linkedin.com/in/tina-bruce-9b1a0813a/"
          target="_blank">Tina Bruce
        </Link>
        <Link
          href="https://www.linkedin.com/in/thérèse-ånmark/"
          target="_blank">Thérèse Ånmark
        </Link>
      </LinkContainer>
    </FooterContainer>
  )
}

export default Footer;

const FooterText = styled.p`
  font-size: 1.1em;
  color: black;
`

const FooterContainer = styled.div`
  color: white;
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
  //margin-top: 10%;

  //@media ${Devices.laptop} {
  //  margin-top: 30%;
  //}

  @media ${Devices.desktop} {
    margin-top: 40%;
  }
`

const LinkContainer = styled.div`
  display: flex;
  /* display: grid;
  grid-template-columns: 50% 50%; */

  @media ${Devices.laptop} {
    display: flex;
  }
`

const Link = styled.a`
  color: black;
  text-decoration: none;
  flex-direction: column;
  display: flex;
  margin: 5px;

@media ${Devices.laptop} {
  display: flex;
  margin: 10px;

  &:hover {
    color: #B74F26;
    transition: all .2s ease-in-out;
    transform: scale(1.1);
  }
}
`

