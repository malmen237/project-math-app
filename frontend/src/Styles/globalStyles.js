import styled from 'styled-components/macro';

const sizes = {
  tablet: '668px',
  laptop: '1024px',
  desktop: '2560px'
};

export const Devices = {
  tablet: `(min-width: ${sizes.tablet})`,
  laptop: `(min-width: ${sizes.laptop})`,
  desktop: `(min-width: ${sizes.desktop})`
};

export const OuterWrapper = styled.div`
  background-color:  #0093E9;
  background-image: linear-gradient(160deg, #80D0C7 0%, #0093E9 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-top: 2rem;
  height: 100vh;
`

export const Headline = styled.h1`
  width: 90%;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  margin-bottom: 1rem;

  @media ${Devices.desktop} {
    width: 50%;
    margin-bottom: 2rem;
  }
`