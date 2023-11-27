// import * as React from "react";
import React, { useEffect, Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route} from "react-router-dom";
import FriendsList from './page/FriendsList';
import ProductDetail from './page/ProductDetail';
import Main from './page/Main';
import Basket from './page/Basket';
import Login from './page/Login';
import Signup from "./page/Signup";
import WritePost from "./page/WritePost";
import PropTypes from 'prop-types';
import Home from "./page/Home";
import Greenheader from './component/Greenheader';
import PdingPage from "./page/PdingPage";
import FooterNavbar from './component/FooterNavbar';
import News from "./page/News";


function App() {

  const basicUrl = 'http://13.209.154.183:8080';
  // const localUrl = 'http://localhost:8080';

  useEffect(() => {
    // 로컬 스토리지에서 토큰 가져오기
    const token = localStorage.getItem('token');
    if (token) {
      // 토큰이 존재한다면 로그인 상태 유지 처리
      // dispatch(userActions.loginCheckDB());
    }
  }, []);

  const shouldRenderGreenheader = !['/login', '/Signup', '/write', '/'].includes(window.location.pathname);

  return (
    <div >
      {shouldRenderGreenheader && <Greenheader />}
      {shouldRenderGreenheader && <FooterNavbar />}
      <Routes>
        <Route path="/" element={<Main basicUrl={basicUrl}/>}/>
        <Route path="/basket/:id" element={<Basket basicUrl={basicUrl}/>}/>
        <Route path="/list/:id" element={<FriendsList basicUrl={basicUrl}/>}/>
        <Route path="/details/:id" element={<ProductDetail basicUrl={basicUrl}/>}/>
        <Route path="/login" element={<Login basicUrl={basicUrl}/>}/>
        <Route path="/signUp" element={<Signup basicUrl={basicUrl}/>}/>
        <Route path="/write" element={<WritePost basicUrl={basicUrl}/>}/>
        <Route path="/home/:id" element={<Home basicUrl={basicUrl}/>}/>
        <Route path="/pding/:id" element={<PdingPage basicUrl={basicUrl}/>}/>
        <Route path="/news/:id" element={<News basicUrl={basicUrl}/>}/>
      </Routes>
     
    </div>
  );
}

export default App;
