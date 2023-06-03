import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import reportWebVitals from './reportWebVitals';
import App from './App/App';
import Header from './App/Header';
import Footer from './App/Footer';

let steam_web_api_key = "13925FB61B1045E5047BF9B5CF359345";
let api_call = "https://api.steampowered.com/<interface>/<method>/v<version>/";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
    <App />
    <Footer /> 
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
