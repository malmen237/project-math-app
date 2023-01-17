/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';
import { Devices } from 'Styles/globalStyles';
import { API_URL } from 'utils/utils';

const Statistics = () => {
  const navigate = useNavigate();
  // Get all of user's training and challenge results
  const [trainStats, setTrainStats] = useState([]);
  const [challengeStats, setChallengeStats] = useState([]);

  // Get user's best training and challenge results
  const [topTrainStat, setTopTrainStat] = useState({});
  const [topChallengeStat, setTopChallengeStat] = useState({});

  // Get best challenge result amongst all users
  const [bestOfAllChalStat, setBestOfAllChalStat] = useState({});

  let starCount = 0;
  // Count total points from all user's trainings
  if (trainStats.length > 0) {
    for (let i = 0; i < trainStats.length; i += 1) {
      starCount += trainStats[i].points
    }
  }

  // Count total points from all user's challenges
  if (challengeStats.length > 0) {
    for (let i = 0; i < challengeStats.length; i += 1) {
      starCount += challengeStats[i].points
    }
  }

  const accessToken = localStorage.getItem('accessToken');
  const username = localStorage.getItem('username');

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

  // Get results from database
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

        <FillerHeader backGroundcolor="rgb(0, 0, 0, 0.3)" />
        {/* //"#FA5CB8" bright pink */}
        <TrainingHeader backGroundcolor="rgb(0, 0, 0, 0.3)">Training</TrainingHeader>
        <ChallengeHeader backGroundcolor="rgb(0, 0, 0, 0.3)">Challenge</ChallengeHeader>

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
        <GridHeader>Top score among all users:</GridHeader>

        <FillerHeader backGroundcolor="rgb(0, 0, 0, 0.3)" />
        <BestChallengeHeader backGroundcolor="rgb(0, 0, 0, 0.3)">Challenge</BestChallengeHeader>
        <RowHeader backGroundcolor="#FACE75" color="#555">Player</RowHeader>
        <BestChallengeItem backGroundcolor="#FFB6C1">{bestOfAllChalStat.username}</BestChallengeItem>

        <RowHeader backGroundcolor="#FACE75" color="#555">Score</RowHeader>
        {/* blue "#5093FA" */}
        <BestChallengeItem backGroundcolor="#FFB6C1" color="#555">{bestOfAllChalStat.score}</BestChallengeItem>

        <RowHeader backGroundcolor="#FACE75" color="#555">Time</RowHeader>
        <BestChallengeItem backGroundcolor="#FFB6C1">{bestOfAllChalStat.time}</BestChallengeItem>

        <RowHeader backGroundcolor="#FACE75" color="#555">Opponent</RowHeader>
        <BestChallengeItem backGroundcolor="#FFB6C1">{bestOfAllChalStat.opponent}</BestChallengeItem>
      </BestGridContainer>
    </>
  )
}

export default Statistics;

const Stars = styled.div`
  border-radius: 1rem;
  background-color: rgb(0, 0, 0, 0.3);
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`

const Title = styled.p`
  font-size: 1.2rem;
  color: white;
  margin: 0.2rem;
`

const UserGridContainer = styled.section`
  display: grid;
  width: 80%;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.1rem;
  margin: 2rem 0;
  @media ${Devices.tablet} {
    width: 50%;
  }
  @media ${Devices.laptop} {
    width: 35%;
  }
  @media ${Devices.desktop} {
    width: 30%;
  }
`

const BestGridContainer = styled(UserGridContainer)`
  grid-template-columns: repeat(2, 1fr);
  width: 70%;
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
  font-weight: bold;
  border-radius: 0.3rem;
  color: #555;
`

const FillerHeader = styled.div`
  grid-column: 1/2;
  background-color: ${(props) => props.backGroundcolor};
  border-radius: 0.3rem;
  border:  0.1rem solid rgb(0, 0, 0, 0.5);
`

const TrainingHeader = styled.div`
  grid-column: 2/3;
  background-color: ${(props) => props.backGroundcolor};
  font-weight: bold;
  padding: 1rem;
  border-radius: 0.3rem;
  border: 0.1rem solid rgb(0, 0, 0, 0.5);
`

const ChallengeHeader = styled(TrainingHeader)`
  grid-column: 3/4;
  border-radius: 0.3rem;
`

const RowHeader = styled.div`
  grid-column: 1/2;
  background-color: ${(props) => props.backGroundcolor};
  color: ${(props) => props.color};
  font-weight: bold;
  padding: 1rem; 
  border-radius: 0.3rem;
  border: 0.1rem solid rgb(0, 0, 0, 0.5);
`

const TrainGridItem = styled.div`
  grid-column: 2/3;
  background-color: ${(props) => props.backGroundcolor};
  padding: 1rem;
  font-size: larger;
  border-radius: 0.3rem;
  color: #555;
  border: 0.1rem solid rgb(0, 0, 0, 0.5);
`

const BestChallengeHeader = styled(ChallengeHeader)`
  grid-column: 2/3;
`

const BestChallengeItem = styled.div`
  grid-column: 2/3;
  background-color: ${(props) => props.backGroundcolor};
  padding: 1rem;
  font-size: larger;
  border-radius: 0.3rem;
  color: #555;
  border: 0.1rem solid rgb(0, 0, 0, 0.5);
`

const ChallengeGridItem = styled(TrainGridItem)`
  grid-column: 3/4;
  border-radius: 0.3rem;
  color: #555;
`