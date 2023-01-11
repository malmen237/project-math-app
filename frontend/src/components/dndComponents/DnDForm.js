import React from 'react';
import styled from 'styled-components/macro';
// import { useMultiDrop } from 'react-dnd-multi-backend';
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
        {basket.length === 0 && <Instruct>Drag & drop your answer here!</Instruct>}
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
  width: 100%;
  border-radius: 5px;
  background-color: beige;
  display: flex;
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
    width: 100%;
    display: none;
    margin: 1rem 0;
    border-radius: 5px;
    align-items: center;
    justify-content: center;

    @media ${Devices.laptop} {
      display: flex;
    }

    @media ${Devices.desktop} {
      display: flex;
    }
  `

const TouchDropArea = styled.div`
    height: 10rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1rem 0;
    border-radius: 6px;
    

    @media ${Devices.tablet} {
      width: 100%;
    }

    @media ${Devices.laptop} {
      display: none;
    }

    @media ${Devices.desktop} {
      display: none;
    }
  `
