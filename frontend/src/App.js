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
import Categories from 'globalComponents/Categories';
import Summary from 'globalComponents/Summary';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Basket } from 'dndComponents/Basket';

const reducer = combineReducers({
  user: user.reducer,
  game: game.reducer
});

const store = configureStore({ reducer });

export const App = () => {
  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <BrowserRouter>
          <Routes>
            <Route path="/drag" element={<Basket />} />
            <Route path="/login" element={<Login />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/category" element={<Categories />} />
            <Route path="/questions" element={<Training />} />
            <Route path="/summary" element={<Summary />} />
            {/* <Route path='/' element={<Main />}></Route> */}
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Routes>
        </BrowserRouter>
      </DndProvider>
    </Provider>
  )
}