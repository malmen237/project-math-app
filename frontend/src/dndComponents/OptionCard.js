import React from 'react';
import { useMultiDrag } from 'react-dnd-multi-backend';
import styled from 'styled-components';
import { Devices } from 'styles/GlobalStyles';

export const OptionCard = ({ id, name, color }) => {
  // Provide's the library the element that needs dragging
  // eslint-disable-next-line max-len
  const [[{ isDragging }], { html5: [html5Props, html5Drag], touch: [touchProps, touchDrag] }] = useMultiDrag({
    type: 'card',
    // item is used to pass data we need for the drop area
    item: { id, name },
    // collect is optional, a function that receives the monitor object
    // monitor holds the state & metadata of the drag action
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  })

  const containerStyle = { opacity: isDragging ? 0.5 : 1 }
  const html5DragStyle = { backgroundColor: color, opacity: html5Props.isDragging ? 0.5 : 1 }
  const touchDragStyle = { backgroundColor: color, opacity: touchProps.isDragging ? 0.5 : 1 }
  return (
  // Any element that is draggable has to have a ref

    <div style={containerStyle}>
      <Mouse style={html5DragStyle} ref={html5Drag}>
        {name}
      </Mouse>
      <Touch style={touchDragStyle} ref={touchDrag}>
        {name}
      </Touch>
    </div>

  )
}

const Touch = styled.div`
    height: 3rem;
    width: 3rem;
    background-color: green;
    margin: 1rem;
    color: white;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-weight: bold;

    @media ${Devices.laptop} {
      display: none;
      height: 5rem;
      width: 5rem;
    }

    @media ${Devices.desktop} {
      display: none;
      height: 5rem;
      width: 5rem;
    }
  `

const Mouse = styled.div`
    height: 5rem;
    width: 5rem;
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