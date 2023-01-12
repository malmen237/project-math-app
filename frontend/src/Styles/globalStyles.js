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

// export const OuterWrapper = styled.div`
//   background-color: white;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   text-align: center;
//   width: 80vw;
//   margin: 2rem auto;
// `
export const OuterWrapper = styled.div`
  background-color:  #0093E9;
  // background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);
  background-image: linear-gradient(160deg, #80D0C7 0%, #0093E9 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-top: 2rem;
  //width: 100vw;
  height: 100vh;
  //margin: 2rem auto;
`