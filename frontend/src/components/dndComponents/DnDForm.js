import React from 'react';
import styled from 'styled-components/macro';
import { Devices } from 'Styles/globalStyles';
import { OptionCard } from './OptionCard';

const DnDForm = ({ problem, basket, html5DropStyle, html5Drop, touchDropStyle, touchDrop }) => {
  const options = () => {
    return problem.option?.map((singleOption, index) => {
      return <OptionCard answer={singleOption} id={index} />
    })
  }

  return (
    <>
      <MouseDropArea style={html5DropStyle} ref={html5Drop}>
        {basket.map((card, index) => <OptionCard id={index} answer={card} />)}
        <div>Drag your answer here!</div>
      </MouseDropArea>
      <TouchDropArea style={touchDropStyle} ref={touchDrop}>
        {basket.map((card, index) => <OptionCard id={index} answer={card} />)}
        {basket.length === 0 && <Instruct>Drag & drop your answer here!</Instruct>}
      </TouchDropArea>
      <Options>
        {options()}
      </Options>
    </>
  );
}

export default DnDForm;

const Options = styled.div`
  //height: 8rem;
  width: 80vw;
  border-radius: 5px;
  background-color: beige;
  display: flex;
  // flex-direction: column;
  flex-wrap: wrap;
  margin-top: 1rem;
  margin-bottom: 2rem;
  align-items: center;
  justify-content: center;
`

const Instruct = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  align-items: center;
  justify-content: center;
`

const MouseDropArea = styled.div`
    height: 10rem;
    width: 30rem;
    /* background-color: thistle; */
    display: none;
    margin: 1rem;
    border-radius: 5px;

    @media ${Devices.laptop} {
      display: flex;
    }

    @media ${Devices.desktop} {
      display: flex;
    }
  `

const TouchDropArea = styled.div`
    height: 10rem;
    width: 80vw;
    /* background-color: thistle; */
    display: flex;
    align-items: center;
    margin: 1rem 0;
    border-radius: 5px;
    justify-content: center;

    @media ${Devices.laptop} {
      display: none;
    }

    @media ${Devices.desktop} {
      display: none;
    }
  `
