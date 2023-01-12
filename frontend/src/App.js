import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from 'components/globalComponents/Login';
import Welcome from 'pages/Welcome';
import NotFound from 'components/globalComponents/NotFound';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import user from 'reducers/user';
import { game } from 'reducers/game';
import Questions from 'components/globalComponents/Questions';
import Categories from 'pages/Categories';
import StartGame from 'pages/StartGame';
import Summary from 'pages/Summary';
import Profile from 'pages/Profile';
import FriendRequestManager from 'components/friendReq/FriendRequestManager';
import Header from 'components/globalComponents/Header';
// import Footer from 'components/globalComponents/Footer';
import { DndProvider } from 'react-dnd-multi-backend';
import { HTML5toTouch } from 'rdndmb-html5-to-touch';
// import styled from 'styled-components/macro';
import { OuterWrapper } from 'Styles/globalStyles';

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
          <OuterWrapper>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/welcome" element={<Welcome />} />
              <Route path="/category" element={<Categories />} />
              <Route path="/game" element={<StartGame />} />
              <Route path="/questions" element={<Questions />} />
              <Route path="/summary" element={<Summary />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/friends" element={<FriendRequestManager />} />
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
            {/* <Footer /> */}
          </OuterWrapper>
        </BrowserRouter>
      </DndProvider>
    </Provider>
  )
}

// const MainWrap = styled.section`
// background-color:  #0093E9; // #4EFA43;
// background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);

// background: rgb(250,23,156);
// background: linear-gradient(0deg, rgba(250,23,156,1) 0%, rgba(80,147,250,1) 100%);
// `