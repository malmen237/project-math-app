import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from 'components/globalComponents/Login';
import Welcome from 'pages/Welcome';
import NotFound from 'components/globalComponents/NotFound';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import user from 'reducers/user';
import { game } from 'reducers/game';
import Questions from 'components/gameComponents/Questions';
import Categories from 'pages/Categories';
import StartGame from 'pages/StartGame';
import Summary from 'pages/Summary';
import Profile from 'pages/Profile';
import Header from 'components/globalComponents/Header';
import { DndProvider } from 'react-dnd-multi-backend';
import { HTML5toTouch } from 'rdndmb-html5-to-touch';

const reducer = combineReducers({
  user: user.reducer,
  game: game.reducer
});

const store = configureStore({ reducer });

export const App = () => {
  return (
    <Provider store={store}>
      <DndProvider options={HTML5toTouch}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/category" element={<Categories />} />
            <Route path="/game" element={<StartGame />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/summary" element={<Summary />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Routes>
        </BrowserRouter>
      </DndProvider>
    </Provider>
  )
}
