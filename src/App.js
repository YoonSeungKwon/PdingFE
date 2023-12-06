// import * as React from "react";
import React, { useEffect, useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route, useLocation} from "react-router-dom";
import FriendsList from './page/FriendsList';
import Main from './page/Main';
import Basket from './page/Basket';
import Login from './page/Login';
import Signup from "./page/Signup";
import WritePost from "./page/WritePost";
import Home from "./page/Home";
import Greenheader from './component/Greenheader';
import PdingPage from "./page/PdingPage";
import FooterNavbar from './component/FooterNavbar';
import News from "./page/News";
import Mypage from "./page/Mypage";
import SavedGifts from "./page/SavedGifts";
import Participating from "./page/Participating";
import OngoingPding from "./page/OngoingPding";
import Pay from './page/Pay';
import ProductDetail from './page/ProductDetail';
import Success from './page/Success';



function App() {
  const location = useLocation();
  const [shouldRenderGreenheader, setShouldRenderGreenheader] = useState(true);
  const [shouldRenderFooterNavbar, setShouldRenderFooterNavbar] = useState(true);
  const userEmail = localStorage.getItem('userEmail');

  const basicUrl = 'http://13.209.154.183:8080';
  // const basicUrl = 'http://localhost:8080';

  useEffect(() => {
    // 로컬 스토리지에서 토큰 가져오기
    const token = localStorage.getItem('token');
    setShouldRenderGreenheader(!['/Login', '/Signup', '/', '/list/'+userEmail, '/ongoing/'+userEmail,'/participate/'+userEmail, '/saved/'+userEmail ].includes(location.pathname));
    setShouldRenderFooterNavbar(!['/Login', '/Signup', '/', '/list/'+userEmail, '/ongoing/'+userEmail,'/participate/'+userEmail, '/saved/'+userEmail].includes(location.pathname));
    
  }, [location.pathname]);


  return (
    <div >
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
        <Route path="/mypage/:id" element={<Mypage basicUrl={basicUrl}/>}/>
        <Route path="/ongoing/:id" element={<OngoingPding basicUrl={basicUrl}/>}/>
        <Route path="/participate/:id" element={<Participating basicUrl={basicUrl}/>}/>
        <Route path="/saved/:id" element={<SavedGifts basicUrl={basicUrl}/>}/>
        <Route path="/pay/:id" element={<Pay basicUrl={basicUrl}/>}/>
        <Route path="/success" element={<Success/>}/>
      </Routes>
     
    </div>
  );
}

export default App;
