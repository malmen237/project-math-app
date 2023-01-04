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
// import Equations from 'dndComponents/Equations';
import Categories from 'globalComponents/Categories';
import Summary from 'globalComponents/Summary';
import FriendRequestManager from 'globalComponents/FriendRequestManager';
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
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/category" element={<Categories />} />
            <Route path="/questions" element={<Training />} />
            {/* <Route path="/equations" element={<Equations />} /> */}
            <Route path="/summary" element={<Summary />} />
            <Route path="/friends" element={<FriendRequestManager />} />
            {/* <Route path='/' element={<Main />}></Route> */}
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Routes>
        </BrowserRouter>
      </DndProvider>
    </Provider>
  )
}