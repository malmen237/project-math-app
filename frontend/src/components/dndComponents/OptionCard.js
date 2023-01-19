/* eslint-disable max-len */
import React from 'react';
import { useMultiDrag } from 'react-dnd-multi-backend';
import styled from 'styled-components';
import { Devices } from 'Styles/globalStyles';

export const OptionCard = ({ id, answer, color }) => {
  // Provide's the library the element that needs dragging
  const [[{ isDragging }], { html5: [html5Props, html5Drag], touch: [touchProps, touchDrag] }] = useMultiDrag({
    type: 'card',
    // item is used to pass data we need for the drop area
    item: { id, answer },
    // collect is optional, a function that receives the monitor object
    // monitor holds the state & metadata of the drag action
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  })

  const containerStyle = { opacity: isDragging ? 0.5 : 1 }
  const html5DragStyle = { backgroundColor: color, opacity: html5Props.isDragging ? 0.5 : 1 }
  const touchDragStyle = { backgroundColor: color, opacity: touchProps.isDragging ? 0.5 : 1 }

  const fractionReturn = () => {
    if (answer[0] === 0 || answer[1] === 0) {
      return 0
    } else if (answer[0] === answer[1]) {
      return 1
    } else {
      return <FractionWrapper><Numerator>{answer[0]}</Numerator><Denominator>{answer[1]}</Denominator></FractionWrapper>
    }
  }

  return (
  // Any element that is draggable has to have a ref
    <div style={containerStyle}>
      <Mouse style={html5DragStyle} ref={html5Drag}>
        {fractionReturn()}
      </Mouse>
      <Touch style={touchDragStyle} ref={touchDrag}>
        {fractionReturn()}
      </Touch>
    </div>

  )
}

const FractionWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const Numerator = styled.p`
  border-bottom: solid white 1px;
  display: block;
  float: left;
  padding: 0 0 2px 0;
`

const Denominator = styled.p`
  display: block;
  clear: left;
  float: left;
  padding: 2px 0 0 0;
`

const Touch = styled.div`
  height: 5rem;
  width: 5rem;
  background-color: green;
  margin: 1rem;
  color: white;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-weight: bold;

  @media ${Devices.laptop} {
    display: none;
    height: 4rem;
    width: 4rem;
  }
  @media ${Devices.desktop} {
    display: none;
    height: 4rem;
    width: 4rem;
  }
`

const Mouse = styled.div`
    height: 4rem;
    width: 4rem;
    background-color: green;
    margin: 1rem;
    color: white;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    display: none;
    text-align: center;
    font-weight: bold;

    @media ${Devices.laptop} {
      display: flex;
    }
    @media ${Devices.desktop} {
      display: flex;
    }
`