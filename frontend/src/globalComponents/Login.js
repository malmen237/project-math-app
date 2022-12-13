import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_URL } from 'utils/utils';
import user from 'reducers/user';
import {
  Wrapper,
  Button,
  Form,
  FormInput,
  RadioButtons,
  SingleRadioButton,
  ErrorMessage,
  HeaderOne,
  HeaderTwo,
  HeaderThree,
  HeaderWrapper
} from './GlobalStyles';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('login');
  const [activeError, setActiveError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((store) => store.user.accessToken);
  const error = useSelector((store) => store.user.error);

  useEffect(() => {
    if (accessToken) {
      navigate('/');
    }
  }, [accessToken]);

  const onFormSubmit = (event) => {
    event.preventDefault();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    }
    fetch(API_URL(mode), options)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUsername(data.response.username));
            dispatch(user.actions.setId(data.response.id))
            dispatch(user.actions.setAccessToken(data.response.accessToken));
            dispatch(user.actions.setError(null));
          });
          // localStorage.setItem("userLocalStorage", data.response.accessToken);
          setActiveError(false);
        } else {
          batch(() => {
            dispatch(user.actions.setUsername(null));
            dispatch(user.actions.setId(null))
            dispatch(user.actions.setAccessToken(null));
            dispatch(user.actions.setError(data.response));
          });
          setActiveError(true);
        }
      })
  }

  return (
    <Wrapper>
      <HeaderWrapper>
        <HeaderOne>Welcome!</HeaderOne>
        <HeaderTwo> Please register or sign in </HeaderTwo>
        <HeaderThree>(it is NES-essary) </HeaderThree>
      </HeaderWrapper>
      <RadioButtons>
        <SingleRadioButton>
          <label htmlFor="register">Register</label>
          <input
            type="radio"
            id="register"
            checked={mode === 'register'}
            onChange={() => setMode('register')} />
        </SingleRadioButton>
        <SingleRadioButton>
          <label htmlFor="login">Login</label>
          <input
            type="radio"
            id="login"
            checked={mode === 'login'}
            onChange={() => setMode('login')} />
        </SingleRadioButton>
      </RadioButtons>
      <Form onSubmit={onFormSubmit}>
        <label htmlFor="username">Username</label>
        <FormInput
          type="text"
          id="username"
          placeholder={mode === 'login' ? 'Enter your username' : 'Choose your username'}
          value={username}
          onChange={(e) => setUsername(e.target.value)} />
        <label htmlFor="password">Password</label>
        <FormInput
          type="password"
          id="password"
          placeholder={mode === 'login' ? 'Enter your password' : 'Choose your password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)} />
        <Button type="submit">{mode === 'login' ? 'Log In' : 'Submit'}</Button>
      </Form>
      <ErrorMessage>{activeError ? error : ''}</ErrorMessage>
    </Wrapper>
  )
}

export default Login;
