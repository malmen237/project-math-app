/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';

const Statistics = () => {
  const [trainStats, setTrainStats] = useState([]);
  console.log('trainstats', trainStats)
  const [challengeStats, setChallengeStats] = useState([]);
  const [topTrainStat, setTopTrainStat] = useState({});
  const [topChallengeStat, setTopChallengeStat] = useState({});
  const [worstTrainStat, setWorstTrainStat] = useState({});
  const [worstChallengeStat, setWorstChallengeStat] = useState({});
  const [bestOfAllTrainStat, setBestOfAllTrainStat] = useState({});
  console.log('bestOfallTrainStat', bestOfAllTrainStat)
  const [bestOfAllChalStat, setBestOfAllChalStat] = useState({});
  console.log('bestOfAllChalStat', bestOfAllChalStat)

  let starCount = 0;
  for (let i = 0; i < trainStats.length; i += 1) {
    starCount += trainStats[i].points
  }

  for (let i = 0; i < challengeStats.length; i += 1) {
    starCount += challengeStats[i].points
  }

  console.log('starCount', starCount)

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
        setTrainStats(json.response.trainStats)
        setChallengeStats(json.response.challengeStats)
        setTopTrainStat(json.response.topTrainStat)
        setTopChallengeStat(json.response.topChallengeStat)
        setWorstTrainStat(json.response.worstTrainStat)
        setWorstChallengeStat(json.response.worstChallengeStat)
        setBestOfAllChalStat(json.response.bestOfAllChalStat[0])
        setBestOfAllTrainStat(json.response.bestOfAllTrainStat[0])
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
      <h1>STARCOUNT: {starCount} </h1>
      {/* User's top results for training and challenge */}
      <GridContainer>
        <GridHeader>Your top results:</GridHeader>
        <FillerHeader backGroundcolor="#FA5CB8" />
        <TrainingHeader backGroundcolor="#FA5CB8">Training</TrainingHeader>
        <ChallengeHeader backGroundcolor="#FA5CB8">Challenge</ChallengeHeader>
        <RowHeader backGroundcolor="lightcoral">Category</RowHeader>
        <TrainGridItem backGroundcolor="#FACE75">{topTrainStat.category}</TrainGridItem>
        <ChallengeGridItem backGroundcolor="#FACE75">{topChallengeStat.category}</ChallengeGridItem>
        <RowHeader backGroundcolor="lightcoral">Score</RowHeader>
        <TrainGridItem backGroundcolor="#FACE75">{topTrainStat.score}</TrainGridItem>
        <ChallengeGridItem backGroundcolor="#FACE75">{topChallengeStat.score}</ChallengeGridItem>
        <RowHeader backGroundcolor="lightcoral">Time</RowHeader>
        <TrainGridItem backGroundcolor="#FACE75">{topTrainStat.time}</TrainGridItem>
        <ChallengeGridItem backGroundcolor="#FACE75">{topChallengeStat.time}</ChallengeGridItem>
        <RowHeader backGroundcolor="lightcoral">Opponent</RowHeader>
        <TrainGridItem backGroundcolor="#FACE75">{topTrainStat.opponent}</TrainGridItem>
        <ChallengeGridItem backGroundcolor="#FACE75">{topChallengeStat.opponent}</ChallengeGridItem>
      </GridContainer>

      {/* User's worst results for training and challenge */}
      <GridContainer>
        <GridHeader>Your least impressive results:</GridHeader>
        <FillerHeader backGroundcolor="#FA5CB8" />
        <TrainingHeader backGroundcolor="#FA5CB8">Training</TrainingHeader>
        <ChallengeHeader backGroundcolor="#FA5CB8">Challenge</ChallengeHeader>
        <RowHeader backGroundcolor="lightcoral">Category</RowHeader>
        <TrainGridItem backGroundcolor="#FACE75">{worstTrainStat.category}</TrainGridItem>
        <ChallengeGridItem backGroundcolor="#FACE75">{worstChallengeStat.category}</ChallengeGridItem>
        <RowHeader backGroundcolor="lightcoral">Score</RowHeader>
        <TrainGridItem backGroundcolor="#FACE75">{worstTrainStat.score}</TrainGridItem>
        <ChallengeGridItem backGroundcolor="#FACE75">{worstChallengeStat.score}</ChallengeGridItem>
        <RowHeader backGroundcolor="lightcoral">Time</RowHeader>
        <TrainGridItem backGroundcolor="#FACE75">{worstTrainStat.time}</TrainGridItem>
        <ChallengeGridItem backGroundcolor="#FACE75">{worstChallengeStat.time}</ChallengeGridItem>
        <RowHeader backGroundcolor="lightcoral">Opponent</RowHeader>
        <TrainGridItem backGroundcolor="#FACE75">{worstTrainStat.opponent}</TrainGridItem>
        <ChallengeGridItem backGroundcolor="#FACE75">{worstChallengeStat.opponent}</ChallengeGridItem>
      </GridContainer>

      {/* Best results for training and challenge among all the registered users */}
      <GridContainer>
        <GridHeader>Current top score among all users:</GridHeader>
        <FillerHeader backGroundcolor="#4EFA43" />
        <TrainingHeader backGroundcolor="#4EFA43">Training</TrainingHeader>
        <ChallengeHeader backGroundcolor="#4EFA43">Challenge</ChallengeHeader>
        <RowHeader backGroundcolor="#5093FA">Player</RowHeader>
        <TrainGridItem backGroundcolor="#FFB6C1">{bestOfAllTrainStat.username}</TrainGridItem>
        <RowHeader backGroundcolor="#5093FA">Category</RowHeader>
        <TrainGridItem backGroundcolor="#FFB6C1">{bestOfAllTrainStat.category}</TrainGridItem>
        <ChallengeGridItem backGroundcolor="#FFB6C1">{bestOfAllChalStat.category}</ChallengeGridItem>
        <RowHeader backGroundcolor="#5093FA">Score</RowHeader>
        <TrainGridItem backGroundcolor="#FFB6C1">{bestOfAllTrainStat.score}</TrainGridItem>
        <ChallengeGridItem backGroundcolor="#FFB6C1">{bestOfAllChalStat.score}</ChallengeGridItem>
        <RowHeader backGroundcolor="#5093FA">Time</RowHeader>
        <TrainGridItem backGroundcolor="#FFB6C1">{bestOfAllTrainStat.time}</TrainGridItem>
        <ChallengeGridItem backGroundcolor="#FFB6C1">{bestOfAllChalStat.time}</ChallengeGridItem>
        <RowHeader backGroundcolor="#5093FA">Opponent</RowHeader>
        <TrainGridItem backGroundcolor="#FFB6C1">{bestOfAllTrainStat.opponent}</TrainGridItem>
        <ChallengeGridItem backGroundcolor="#FFB6C1">{bestOfAllChalStat.opponent}</ChallengeGridItem>
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
  background-color: ${(props) => props.backGroundcolor};// #FA5CB8;
  border-radius: 0.3rem;
`

const TrainingHeader = styled.div`
  grid-column: 2/3;
  background-color: ${(props) => props.backGroundcolor}; // #FA5CB8;
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
  background-color: ${(props) => props.backGroundcolor}; // lightcoral; // #5093FA
  border-radius: 0.3rem;
`

const TrainGridItem = styled.div`
  grid-column: 2/3;
  background-color: ${(props) => props.backGroundcolor}; // #FACE75;
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