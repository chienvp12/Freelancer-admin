import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import Login from './component/Login/Login';

const root = ReactDOM.createRoot(document.getElementById('root'));
const res = localStorage.getItem('SAVED_TOKEN');

root.render(
    <BrowserRouter>
        {res ? <App /> : <Login />}
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

