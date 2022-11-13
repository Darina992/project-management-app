import { Layout } from 'components/layout/Layout';
import { NotFoundPage } from 'pages/404/NotFoundPage';
import { BoardPage } from 'pages/boardPage/BoardPage';
import { MainPage } from 'pages/mainPage/MainPage';
import { WelcomePage } from 'pages/welcomePage/WelcomePage';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

export const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<WelcomePage />} />
        <Route path="main" element={<MainPage />} />
        <Route path="board" element={<BoardPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
