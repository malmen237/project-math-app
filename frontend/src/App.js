import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import Main from 'components/Main';
import Login from 'globalComponents/Login';
import Welcome from 'globalComponents/Welcome';
import NotFound from 'globalComponents/NotFound';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import user from 'reducers/user';
import { game } from 'reducers/game';
import Training from 'globalComponents/Training';

const reducer = combineReducers({
  user: user.reducer,
  game: game.reducer
});

const store = configureStore({ reducer });

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/questions" element={<Training />} />
          {/* <Route path='/' element={<Main />}></Route> */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}