import React, { useContext, useState, useEffect } from 'react';
import './Login.css';

import Loader from '../Loader';

import AuthContext from '../context/Auth';
import * as Cognito from '../lib/cognito';

function Login(props) {
  const Auth = useContext(AuthContext);

  useEffect(() => {
    const getCurrentUser = async () => {
      const currentUser = await Cognito.isValidSession();
      if (currentUser) {
        Auth.isLoggedIn(currentUser, props.history);
      }
    }

    getCurrentUser();
  });

  (async () => {
  })();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoadding] = useState(false);
  const [isWrongCred, setWrongCred] = useState(false);

  const handleSignIn = async () => {
    setLoadding(true);
    try {
      await Auth.login({ username, password }, props.history);
    } catch (err) {
      setWrongCred(true);
      setLoadding(false);
    }
  }

  const onUsernameChanged = ({ target: { value } }) => {
    setUsername(value);
  }

  const onPasswordChanged = ({ target: { value } }) => {
    setPassword(value);
  }

  return (
    <div className="Login">
      <div className="Login-Card">
        <h2>Login</h2>
        <div className="Controls">
          <div className="Control">
            <label htmlFor="username">Username</label>
            <input value={username} onChange={onUsernameChanged} id="username" type="text" />
          </div>
          <div className="Control">
            <label htmlFor="passwd">Password</label>
            <input value={password} onChange={onPasswordChanged} id="passwd" type="password" />
          </div>
          <button onClick={handleSignIn} className="Submit">
            {isLoading ? <Loader /> : 'Sign in'}
          </button>
        </div>
        {isWrongCred && <span className="Error">* Incorrect username or password</span>}
      </div>
    </div>
  );
}

export default Login;
