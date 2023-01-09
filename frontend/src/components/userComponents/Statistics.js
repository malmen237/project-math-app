/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';

const Statistics = () => {
  // const [trainStats, setTrainStats] = useState({});
  // const [challengeStats, setChallengeStats] = useState({});
  const [topTrainStat, setTopTrainStat] = useState({});
  const [topChallengeStat, setTopChallengeStat] = useState({});
  const [worstTrainStat, setWorstTrainStat] = useState({});
  const [worstChallengeStat, setWorstChallengeStat] = useState({});
  // const [challengeStats, setChallengeStats] = useState([]);
  // console.log('trainstats', trainStats)
  // console.log('Cstats', challengeStats)

  const username = useSelector((state) => state.user.username);
  console.log('username in statistics', username)

  // Get users results from database
  useEffect(() => {
    fetch(`http://localhost:8080/userstats/${username}`)
      .then((res) => res.json())
      .then((json) => {
        setTopTrainStat(json.response.topTrainStat)
        setTopChallengeStat(json.response.topChallengeStat)
        setWorstTrainStat(json.response.worstTrainStat)
        setWorstChallengeStat(json.response.worstChallengeStat)
        // setChallengeStats(json.response.challengeStats)
        // setTrainStats(json.response.trainStats[0])
        // setChallengeStats(json.response.challengeStats[0])
        console.log('json.response', json.response);
      })
  }, []);

  // const topTrainStat = trainStats[0]
  // const topChalStat = challengeStats[0]
  // const worstTrainStat = trainStats[trainStats.length - 1]
  // const worstChalStat = challengeStats[challengeStats.length - 1]
  // console.log('topTrainStat typeof', typeof topTrainStat, topTrainStat)
  // console.log('worstTrainStat typeof', typeof worstTrainStat, worstTrainStat)

  return (
    <>
      <GridContainer>
        <GridHeader>Your top results:</GridHeader>
        <FillerHeader />
        <TrainingHeader>Training</TrainingHeader>
        <ChallengeHeader>Challenge</ChallengeHeader>

        <RowHeader>Category</RowHeader>
        <TrainGridItem>{topTrainStat.category}</TrainGridItem>
        <ChallengeGridItem>{topChallengeStat.category}</ChallengeGridItem>
        <RowHeader>Score</RowHeader>
        <TrainGridItem>{topTrainStat.score}</TrainGridItem>
        <ChallengeGridItem>{topChallengeStat.score}</ChallengeGridItem>
        <RowHeader>Time</RowHeader>
        <TrainGridItem>{topTrainStat.time}</TrainGridItem>
        <ChallengeGridItem>{topChallengeStat.time}</ChallengeGridItem>
        <RowHeader>Opponent</RowHeader>
        <TrainGridItem>{topTrainStat.opponent}</TrainGridItem>
        <ChallengeGridItem>{topChallengeStat.opponent}</ChallengeGridItem>
      </GridContainer>

      <GridContainer>
        <GridHeader>Your least impressive results:</GridHeader>
        <FillerHeader />
        <TrainingHeader>Training</TrainingHeader>
        <ChallengeHeader>Challenge</ChallengeHeader>

        {/* Top results for training and challenge */}
        <RowHeader>Category</RowHeader>
        <TrainGridItem>{worstTrainStat.category}</TrainGridItem>
        <ChallengeGridItem>{worstChallengeStat.category}</ChallengeGridItem>
        <RowHeader>Score</RowHeader>
        <TrainGridItem>{worstTrainStat.score}</TrainGridItem>
        <ChallengeGridItem>{worstChallengeStat.score}</ChallengeGridItem>
        <RowHeader>Time</RowHeader>
        <TrainGridItem>{worstTrainStat.time}</TrainGridItem>
        <ChallengeGridItem>{worstChallengeStat.time}</ChallengeGridItem>
        <RowHeader>Opponent</RowHeader>
        <TrainGridItem>{worstTrainStat.opponent}</TrainGridItem>
        <ChallengeGridItem>{worstChallengeStat.opponent}</ChallengeGridItem>

      </GridContainer>
    </>
  )
}

export default Statistics;

const GridContainer = styled.section`
  display: grid;
  width: 90vw;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.1rem;
  margin: 2rem 0;
`

const GridHeader = styled.div`
  grid-column: span 3;
  background-color: lightcyan;
  padding: 1rem;
  font-size: larger;
  border-radius: 0.3rem;
`

const FillerHeader = styled.div`
  grid-column: 1/2;
  gap: 0;
  background-color: #FA5CB8;
  border-radius: 0.3rem;
`

const TrainingHeader = styled.div`
  grid-column: 2/3;
  background-color: #FA5CB8;
  font-weight: bold;
  padding: 1rem;
  border-radius: 0.3rem;
`

const ChallengeHeader = styled(TrainingHeader)`
  grid-column: 3/4;
  border-radius: 0.3rem;
`

const RowHeader = styled(TrainingHeader)`
  grid-column: 1/2;
  background-color: lightcoral;
  border-radius: 0.3rem;
`

const TrainGridItem = styled.div`
  grid-column: 2/3;
  background-color: #FACE75;
  padding: 0.5rem;
  font-size: larger;
  border-radius: 0.3rem;
`

const ChallengeGridItem = styled(TrainGridItem)`
  grid-column: 3/4;
  border-radius: 0.3rem;
`

/* <ColumnHeader>Quiz type</ColumnHeader>
      <ColumnHeader>Category</ColumnHeader>
      <ColumnHeader>Score</ColumnHeader>
      <ColumnHeader>Points (Stars?)</ColumnHeader>
      <ColumnHeader>Time</ColumnHeader>
      <ColumnHeader>Opponent</ColumnHeader>
      {trainStats.map((item) => (
        <>
          <GridItem>{item.quiztype}</GridItem>
          <GridItem>{item.category}</GridItem>
          <GridItem>{item.score} / 10</GridItem>
          <GridItem>{item.points}</GridItem>
          <GridItem>{item.time}</GridItem>
          <GridItem>{item.opponent}</GridItem>
        </>
      ))} */