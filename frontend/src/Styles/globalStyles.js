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
  //background-color: white;
  //background-color: blue;
  background: rgb(250,23,156);
  background: linear-gradient(0deg, rgba(250,23,156,1) 0%, rgba(80,147,250,1) 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 80vw;
  height: 80vh;
  margin: 2rem auto;
`
// Remember: changes made in Footer