/* eslint-disable max-len */
import React from 'react';
import styled from 'styled-components/macro';
// import { useMultiDrop } from 'react-dnd-multi-backend';
import { Devices } from 'styles/GlobalStyles';
import { OptionCard } from './OptionCard';

const DnDForm = ({ answer, problem, basket, html5DropStyle, html5Drop, touchDropStyle, touchDrop }) => {
  console.log('answer', answer)
  const option1 = <OptionCard id={problem.id} name={problem.answer} />
  const option2 = <OptionCard id={problem.id} name={problem.secondAnswer} />
  const option3 = <OptionCard id={problem.id} name={problem.thirdAnswer} />
  const option4 = <OptionCard id={problem.id} name={problem.fourthAnswer} />

  const options = [option1, option2, option3, option4];

  const shuffledOptions = options.sort(() => {
    return Math.random() - 0.5;
  });

  return (
    <>
      <MouseDropArea style={html5DropStyle} ref={html5Drop}>
        {basket.map((card, index) => <OptionCard key={card} id={index} name={card} />)}
        <div>Drag your answer here!</div>
      </MouseDropArea>
      <TouchDropArea style={touchDropStyle} ref={touchDrop}>
        {basket.map((card, index) => <OptionCard key={card} id={index} name={card} />)}
        {/* {!touchProps.isOver && <Instruct>Drag & drop your answer here!</Instruct>} */}
        {basket.length === 0 && <Instruct>Drag & drop your answer here!</Instruct>}
        {/* {touchProps.isOver && <div>Drop Here!</div>} */}
      </TouchDropArea>
      <Pets>
        {shuffledOptions}
        {/* {problem.answers?.map((card, index) => <OptionCard key={card} id={index} name={card} />)} */}
      </Pets>
    </>
  );
}

// {
//   "number": 1,
//   "text": "What is x in: ",
//   "question": "3x + 6 = 9",
//   "answers": [
//     "1",
//     "9",
//     "6",
//     "4"
//   ],
//   "correct_answer": 1
// }

export default DnDForm;

const Pets = styled.div`
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
