import React from 'react';

const AuthContext = React.createContext({
  user: null,
  login: () => { },
  logout: () => { },
  isLoggedIn: () => { },
});

export default AuthContext;
