/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';
import { API_URL } from 'utils/utils';

const ProfileBtn = () => {
  const [activeChallenge, setActiveChallenge] = useState(false)
  const [loading, setLoading] = useState(true)
  const userid = useSelector((state) => state.user.id);
  const navigate = useNavigate();

  // Authenticate user
  const accessToken = localStorage.getItem('accessToken');
  useEffect(() => {
    if (!accessToken) {
      navigate('/');
    }
  }, []);

  const goBack = () => {
    navigate('/profile');
  }

  const checkIfChallenge = () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      }
    }
    fetch(API_URL(`challenges/${userid}`), options)
      .then((res) => res.json())
      .then((json) => {
        if (json.response.length === 0) {
          return (
            <>
            </>
          )
        } else if (json.response[0].opponent === userid && json.response[0].active === true) {
          setActiveChallenge(true)
          setLoading(false)
        }
      })
  }

  if (loading) {
    setInterval(checkIfChallenge, 10 * 1000);
  }

  return (
    <>
      {activeChallenge ? <PopUp /> : ''}
      <ProfileButton type="button" className="back-btn" onClick={goBack}>
      Profile &gt;
      </ProfileButton>
    </>
  )
}

export default ProfileBtn;

const ProfileButton = styled.button`
  color: turquoise;
  background-color: transparent;
  border: none;
  padding: 2%;
  font-size: 2em;
`

const PopUp = styled.div`
  background-color: #FF6933;
  border: solid 2px #FF0333;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  display: flex;
  animation: alert 400ms ease-in-out forwards;
  z-index: 2;
  position: relative;
  left: -72px;

  @keyframes alert {
    0% {
      opacity: 0;
      top: 0;
    }
    5% {
      opacity: 0;
    }
    100% {
      opacity: 1;
      top: 2rem;
    }
  }
`
