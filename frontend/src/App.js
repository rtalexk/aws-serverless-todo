import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import AuthContext from './context/Auth';

import * as Cognito from './lib/cognito';

import Login from './Login';
import TodoList from './TodoList';

function TodoApp() {
  const [user, setUser] = useState(null);

  const isLoggedIn = (currentUser, history) => {
    setUser(currentUser);
    history.replace('/');
  }

  const login = async ({ username, password } = {}, history) => {
    const authUser = await Cognito.signin({ username, password });
    setUser(authUser);
    history.replace('/');
  };

  const logout = (history) => {
    Cognito.signout();
    setUser(null);
    history.replace('/login');
  }

  return (
    <Router>
      <AuthContext.Provider value={{ login, logout, isLoggedIn, user }}>
        <div className="todo-app">
          <Route exact path="/" component={TodoList} />
          <Route path="/login" component={Login} />
        </div>
      </AuthContext.Provider>
    </Router>
  );
}

export default TodoApp;
