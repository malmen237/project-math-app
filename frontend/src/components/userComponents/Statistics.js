/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';

const Statistics = () => {
  const [stats, setStats] = useState([]);
  console.log('stats', stats)

  const username = useSelector((state) => state.user.username);
  console.log('username in statistics', username)

  // Get users results from database
  useEffect(() => {
    fetch(`http://localhost:8080/userstats/${username}`)
      .then((res) => res.json())
      .then((json) => {
        setStats(json.response)
        console.log('json.response', json.response);
      })
  }, []);

  return (
    <GridContainer>
      <ColumnHeader>Quiz type</ColumnHeader>
      <ColumnHeader>Category</ColumnHeader>
      <ColumnHeader>Score</ColumnHeader>
      <ColumnHeader>Points (Stars?)</ColumnHeader>
      <ColumnHeader>Time</ColumnHeader>
      <ColumnHeader>Opponent</ColumnHeader>
      {stats.map((item) => (
        <>
          <GridItem>{item.quiztype}</GridItem>
          <GridItem>{item.category}</GridItem>
          <GridItem>{item.score} / 10</GridItem>
          <GridItem>{item.points}</GridItem>
          <GridItem>{item.time}</GridItem>
          <GridItem>{item.opponent}</GridItem>
        </>
      ))}
    </GridContainer>

  )
}

export default Statistics;

const GridContainer = styled.section`
  display: grid;
  width: 90vw;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.3rem;
`
const ColumnHeader = styled.div`
  background-color: #FA5CB8;
  font-weight: bold;
  padding: 1rem;
`

const GridItem = styled.div`
  background-color: #FACE75;
  padding: 0.5rem;
  font-size: larger;
`