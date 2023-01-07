/* eslint-disable max-len */
/* eslint-disable no-plusplus */
import React from 'react';
import styled from 'styled-components/macro';
// import { useMultiDrop } from 'react-dnd-multi-backend';
import { Devices } from 'styles/globalStyles';
import { OptionCard } from './OptionCard';

const DnDForm = ({ problem, basket, html5DropStyle, html5Drop, touchDropStyle, touchDrop }) => {
  const options = () => {
    return problem.option?.map((singleOption, index) => {
      // if (singleOption[0] === 0 || singleOption[1] === 0) {
      //   return <OptionCard name={[0]} id={index} />
      // } else if (singleOption[0] === singleOption[1]) {
      //   return <OptionCard name={[1]} id={index} />
      // } else {
      return <OptionCard name={singleOption} id={index} />
    })
    // })
  }

  return (
    <>
      <MouseDropArea style={html5DropStyle} ref={html5Drop}>
        {basket.map((card, index) => <OptionCard id={index} name={card} />)}
        <div>Drag your answer here!</div>
      </MouseDropArea>
      <TouchDropArea style={touchDropStyle} ref={touchDrop}>
        {basket.map((card, index) => <OptionCard id={index} name={card} />)}
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
  height: 8rem;
  width: 80vw;
  border-radius: 5px;
  background-color: beige;
  display: flex;
  margin-top: 1rem;
  margin-bottom: 2rem;
  align-items: center;
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
