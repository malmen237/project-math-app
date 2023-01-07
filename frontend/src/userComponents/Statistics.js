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
  // <table>
  //   <thead>
  //     <tr>
  //       <th>Quiz Type</th>
  //       <th>Score</th>
  //       <th>Points</th>
  //       <th>Time</th>
  //       <th>Opponent</th>
  //     </tr>
  //   </thead>

  //   <tbody>
  //     {stats.map((item) => (
  //       <tr>
  //         <td>{item.quiztype}</td>
  //         <td>{item.score}</td>
  //         <td>{item.points}</td>
  //         <td>{item.time}</td>
  //         <td>{item.opponent}</td>
  //       </tr>
  //     ))}
  //   </tbody>
  // </table>

    <GridContainer>
      <ColumnHeader>Quiz type</ColumnHeader>
      <ColumnHeader>Score</ColumnHeader>
      <ColumnHeader>Points (Stars?)</ColumnHeader>
      <ColumnHeader>Time</ColumnHeader>
      <ColumnHeader>Opponent</ColumnHeader>
      {stats.map((item) => (
        <>
          <GridItem>{item.quiztype}</GridItem>
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
  grid-template-columns: repeat(5, 1fr);
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
`