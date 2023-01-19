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
  // justify-content: center;
  text-align: center;
  padding-top: 0.5rem;
  min-height: 100vh;

  @media ${Devices.tablet} {
    padding-top: 1rem;
  }

  @media ${Devices.laptop} {
    padding-top: 2rem;
  }
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

export const ChoiceWrapper = styled.div`
  display: flex;
  //flex-direction: wrap;
  justify-content: center;
  width: 80vw;

  @media ${Devices.tablet} {
    margin: 2rem;
    width: 50vw;
  }

  @media ${Devices.laptop} {
    width: 30vw;
  }
`

export const Choose = styled.p`
  font-size: 1.6rem;
  color: whitesmoke;
  margin-bottom: 1rem;
  width: 80vw;
`

export const Choice = styled.button`
  width: 8rem;
  background-color: #FACE75;  // original colour #F7DD65;  // alt colour #4EFA43;
  color: #666;
  border-radius: 15px;
  border: 3px solid #5DB0B2; // original colour #5DB0B2; // alt colour #5093FA; 
  box-shadow: 10px 5px 5px #666; 
  font-weight: bold;
  font-size: 1.5rem;
  padding: 1rem 0;
  margin: 1rem;
  //display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  @media ${Devices.tablet} {
    width: 10rem;
  }
`

// GRADIENT DARKER BLUE
// background-color:  #3D48C0;
// background-image: linear-gradient(160deg, #19B7F9 0%, #3D48C0 100%);

// LIGHT BLUE GRADIENT BACKGROUND
// background-color:  #0093E9;
// background-image: linear-gradient(160deg, #80D0C7 0%, #0093E9 100%);