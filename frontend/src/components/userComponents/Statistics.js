/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';
import { Devices } from 'Styles/globalStyles';
import { API_URL } from 'utils/utils';

const Statistics = () => {
  const navigate = useNavigate();
  const [trainStats, setTrainStats] = useState([]);
  const [challengeStats, setChallengeStats] = useState([]);
  const [topTrainStat, setTopTrainStat] = useState({});
  const [topChallengeStat, setTopChallengeStat] = useState({});
  const [bestOfAllChalStat, setBestOfAllChalStat] = useState({});

  let starCount = 0;
  // Count total points from all users trainings
  for (let i = 0; i < trainStats.length; i += 1) {
    starCount += trainStats[i].points
  }
  // Count total points from all users challenges
  for (let i = 0; i < challengeStats.length; i += 1) {
    starCount += challengeStats[i].points
  }

  // const username = useSelector((state) => state.user.username);
  const accessToken = localStorage.getItem('accessToken');
  const username = localStorage.getItem('username');
  console.log('username in statistics', typeof username)

  // Authenticate user
  useEffect(() => {
    if (!accessToken) {
      navigate('/');
    }
  }, []);

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: accessToken
    }
  }

  // Get users results from database
  useEffect(() => {
    fetch(API_URL(`userstats/${username}`), options)
      .then((res) => res.json())
      .then((json) => {
        setTrainStats(json.response.trainStats)
        setChallengeStats(json.response.challengeStats)
        setTopTrainStat(json.response.topTrainStat)
        setTopChallengeStat(json.response.topChallengeStat)
        setBestOfAllChalStat(json.response.bestOfAllChalStat[0])
      })
  }, []);

  return (
    <>
      <Stars>
        <Title>⭐ count:</Title>
        <Title>{starCount}</Title>
      </Stars>
      {/* User's top results for training and challenge */}
      <UserGridContainer>
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
      </UserGridContainer>

      {/* Best results for challenge among all the registered users */}
      <BestGridContainer>
        <GridHeader>Current top score among all users:</GridHeader>

        <FillerHeader backGroundcolor="#4EFA43" />
        <BestChallengeHeader backGroundcolor="#4EFA43">Challenge</BestChallengeHeader>
        <RowHeader backGroundcolor="#5093FA">Player</RowHeader>
        <BestChallengeHeader backGroundcolor="#FFB6C1" />

        <RowHeader backGroundcolor="#5093FA">Category</RowHeader>
        <BestChallengeHeader backGroundcolor="#FFB6C1">{bestOfAllChalStat.category}</BestChallengeHeader>

        <RowHeader backGroundcolor="#5093FA">Score</RowHeader>
        <BestChallengeHeader backGroundcolor="#FFB6C1">{bestOfAllChalStat.score}</BestChallengeHeader>

        <RowHeader backGroundcolor="#5093FA">Time</RowHeader>
        <BestChallengeHeader backGroundcolor="#FFB6C1">{bestOfAllChalStat.time}</BestChallengeHeader>

        <RowHeader backGroundcolor="#5093FA">Opponent</RowHeader>
        <BestChallengeHeader backGroundcolor="#FFB6C1">{bestOfAllChalStat.opponent}</BestChallengeHeader>
      </BestGridContainer>
    </>
  )
}

export default Statistics;

const Stars = styled.div`
  border: 2px solid #555;
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  //align-items: flex-start; 
  margin: 2rem;
`

const Title = styled.p`
  font-size: 1.2rem;
  color: #555;
  margin: 0.2rem;
`

const UserGridContainer = styled.section`
  display: grid;
  width: 90%;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.1rem;
  margin: 2rem 0;

  @media ${Devices.tablet} {
    width: 50%;
  }
  @media ${Devices.laptop} {
    width: 40%;
  }
  @media ${Devices.desktop} {
    width: 30%;
  }
`

const BestGridContainer = styled(UserGridContainer)`
  grid-template-columns: repeat(2, 1fr);
  width: 80%;

  @media ${Devices.tablet} {
    width: 40%;
  }
  @media ${Devices.laptop} {
    width: 30%;
  }
  @media ${Devices.desktop} {
    width: 20%;
  }
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

const BestChallengeHeader = styled(ChallengeHeader)`
  grid-column: 2/3;
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