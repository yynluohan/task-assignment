import React from 'react';
import Home from '../components/home/Home';
import Login from './login';
import Register from './register';
import ResetPassword from './resetPassword'

export default function () {

  if (!window.localStorage.token) {
    window.localStorage.currentStatus = '登录'
  }

  const createElement = () => {
    const status = window.localStorage.currentStatus;
    if (status == '登录') {
      window.location.href = window.MC.HASH + '/login'
      return <Login />
    }  else {
      return <Home />
    }
  }

  return (
    <div>
      { createElement() }
    </div>
  );
}
