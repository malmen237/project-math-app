import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_URL } from 'utils/utils';
import user from 'reducers/user';
// import { OuterWrapper } from 'styles/globalStyles';
import styled from 'styled-components/macro';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [mode, setMode] = useState('login');
  const [activeError, setActiveError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((store) => store.user.accessToken);
  const error = useSelector((store) => store.user.error);

  useEffect(() => {
    if (accessToken) {
      navigate('/welcome');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  const onFormSubmit = (event) => {
    event.preventDefault();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password, email })
    }
    fetch(API_URL(mode), options)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUsername(data.response.username));
            dispatch(user.actions.setId(data.response.id));
            dispatch(user.actions.setUserEmail(data.response.email));
            dispatch(user.actions.setAccessToken(data.response.accessToken));
            dispatch(user.actions.setError(null));
          });
          setActiveError(false);
        } else {
          batch(() => {
            dispatch(user.actions.setUsername(null));
            dispatch(user.actions.setId(null));
            dispatch(user.actions.setUserEmail(null));
            dispatch(user.actions.setAccessToken(null));
            dispatch(user.actions.setError(data.response));
          });
          setActiveError(true);
        }
      })
  }

  return (
    <PageWrapper>
      {/* <LoginWrapper> */}
      <Intro>
        <h1>Welcome!</h1>
        <h2> Please register or sign in </h2>
      </Intro>
      <Selection>
        <div>
          <label htmlFor="register">Register
            <input
              type="radio"
              id="register"
              checked={mode === 'register'}
              onChange={() => setMode('register')} />
          </label>
        </div>
        <div>
          <label htmlFor="login">Login
            <input
              type="radio"
              id="login"
              checked={mode === 'login'}
              onChange={() => setMode('login')} />
          </label>
        </div>
      </Selection>
      <StyledForm onSubmit={onFormSubmit}>
        <label htmlFor="username">Username
          <input
            type="text"
            id="username"
            placeholder={mode === 'login' ? 'Enter your username' : 'Choose your username'}
            value={username}
            onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label htmlFor="password">Password
          <input
            type="password"
            id="password"
            placeholder={mode === 'login' ? 'Enter your password' : 'Choose your password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </label>
        <label htmlFor="email">Email
          <input
            type="email"
            id="email"
            placeholder={mode === 'login' ? 'Enter your email' : 'Add your email-adress'}
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
        </label>
        <StyledButton type="submit">{mode === 'login' ? 'Log In' : 'Submit'}</StyledButton>
      </StyledForm>
      <p>{activeError ? error : ''}</p>
      {/* </LoginWrapper> */}
    </PageWrapper>
  )
}

export default Login;

const PageWrapper = styled.section`
  // border: 2px solid blue;
  color: white;
  font-weight: bold;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // padding: 2rem 45vw;
  // text-align: center;
  // border: 2px red solid;
  background-color: #0093E9;
  background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);
`

const StyledForm = styled.form`
  // border: 2px solid green;
  font-size: 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  label {
    color: white;
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 10px;
  }
  label + button {
    margin-top: 10px;
  }
  input {
    margin-left: 10px;
    border-radius: 5px;
    border: none;
    padding: 0.5rem;
  }
`

const Intro = styled.div`
  margin-bottom: 1rem;
  align-self: center;
`

const Selection = styled.div`
  // border: 2px solid red;
  width: 60vw;
  font-size: 1.2rem;
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  input {
    width: 1.5rem;
    height: 1.5rem;
  }
`

const StyledButton = styled.button`
  font-size: 1.2rem;
  color: white;
  background: none;
  border: 2px solid white;
  padding: 5px 10px;
  border-radius: 10px;
  &:hover {
    color: #b84545;
    background-color: white;
    transition: 0.5s background-color ease-in-out;
    cursor: pointer;
  }
  &:active {
    transform: translateY(3px);
  }
`