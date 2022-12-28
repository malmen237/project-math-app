import React, { useState } from 'react'
import { useDrop } from 'react-dnd';
import styled from 'styled-components';
import { PetCard } from './PetCard';

const PETS = [
  { id: 1, name: 'dog' },
  { id: 2, name: 'cat' },
  { id: 3, name: 'fish' },
  { id: 4, name: 'hamster' }
]

export const Basket = () => {
  // array for dropped items
  const [basket, setBasket] = useState([])

  const addPetToBasket = (id) => {
    console.log(id)
    const petList = PETS.filter((pet) => pet.id === id)
    // setBasket(() => [...basket, petList[0]])
    setBasket([petList[0]])
  }

  const [{ isOver }, dropRef] = useDrop({
  // input object:
    // accept is mandatory
    accept: 'pet',
    // drop is a callback function, triggers with every drop, receives data from item in useDrag
    // adds the item to the basket array if it's not already there, a new instance of array returned
    drop: (item) => addPetToBasket(item.id),
    // setBasket(PETS[0]),
    // setBasket((basket) => (!basket.includes(item) ? [...basket, item] : basket)),
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  })

  return (
    <>
      <Pets>
        {PETS.map((pet) => <PetCard draggable id={pet.id} name={pet.name} />)}
      </Pets>
      {/* Any element that is draggable has to have a ref */}
      <BasketArea ref={dropRef}>
        {basket.map((pet) => <PetCard draggable id={pet.id} name={pet.name} />)}
        {/* If the item is within the drop area, "drop here" is displayed */}
        {isOver && <div>Drop Here!</div>}
      </BasketArea>
    </>
  )
}

const Pets = styled.div`
  height: 25rem;
  width: 25rem;
  background-color: beige;
  display: flex;
  margin: 1rem;
`

const BasketArea = styled.div`
  height: 25rem;
  width: 25rem;
  background-color: thistle;
  display: flex;
  margin: 1rem;
`