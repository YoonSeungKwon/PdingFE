import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './modules';
import TokenRefresher from './component/TokenRefresher';
import FooterNavbar from './component/FooterNavbar';
import Greenheader from './component/Greenheader';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <TokenRefresher/> 
    
    <App />
  </BrowserRouter>,
);
