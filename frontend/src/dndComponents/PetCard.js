import React from 'react';
import { useDrag } from 'react-dnd';
import styled from 'styled-components';

export const PetCard = ({ id, name }) => {
  // Provide's the library the element that needs dragging
  const [{ isDragging }, dragRef] = useDrag({
  // input object:
    // type is mandatory
    type: 'pet',
    // item is used to pass data we need for the drop area
    item: { id, name },
    // collect is optional, a function that receives the monitor object
    // monitor holds the state & metadata of the drag action
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  })
  return (
    // Any element that is draggable has to have a ref
    <Pet ref={dragRef}>
      {name}
      {isDragging && '😱'}
    </Pet>
  )
}

const Pet = styled.div`
  height: 5rem;
  width: 5rem;
  background-color: green;
  margin: 1rem;
  text-align: center;
  color: white;
`