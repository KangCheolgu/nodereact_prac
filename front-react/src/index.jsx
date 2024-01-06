import React from 'react';
import './assets/css/style.css';
import reportWebVitals from './reportWebVitals.js';
import { createBrowserHistory } from "history";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Signup from './views/signup/signup.jsx';
import Home from "./views/home/home.jsx";
import Board from './views/board/board.jsx';
import Detail from './views/detail/detail.jsx';
const root = ReactDOM.createRoot(document.getElementById("root"));

var hist = createBrowserHistory();
root.render(
  <BrowserRouter history={hist}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/board" element={<Board />} />
      <Route path="/detail?*" element={<Detail />} />

      {/* <Route path="/signup" element={<Signup />} /> */}
      {/* <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/reservation" element={<Reservation />} />
      <Route path="/reservationlist" element={<Roomlist />} />
      <Route path="/mypage" element={<Memberinfo />} />
      
      <Route path="/success" element={<SuccessPage />} />
      <Route path="/info" element={<Information />} /> */}
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
