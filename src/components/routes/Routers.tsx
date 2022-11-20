import { Layout } from 'components/layout/Layout';
import { NotFoundPage } from 'pages/404/NotFoundPage';
import { BoardPage } from 'pages/boardPage/BoardPage';
import { MainPage } from 'pages/mainPage/MainPage';
import { ProfilePage } from 'pages/profile/Profile';
// import { SignIn } from 'pages/signIn/SignIn';
// import { SignUp } from 'pages/signUp/SignUp';
import { WelcomePage } from 'pages/welcomePage/WelcomePage';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

export const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<WelcomePage />} />
        {/* <Route path="signUp" element={<SignUp />} />
        <Route path="signIn" element={<SignIn />} /> */}
        <Route path="main" element={<MainPage />} />
        <Route path="board" element={<BoardPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
