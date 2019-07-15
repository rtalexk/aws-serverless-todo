import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

import Config from '../config';

const UserPool = new CognitoUserPool(Config.cognito);

export const getCurrentUser = () => UserPool.getCurrentUser();

export const signin = ({ username, password }) => {
  const authData = { Username: username, Password: password };
  const userData = { Username: username, Pool: UserPool };
  const authDetails = new AuthenticationDetails(authData);

  const user = new CognitoUser(userData);

  return new Promise((resolve, reject) => {
    user.authenticateUser(authDetails, {
      onSuccess: res => resolve(res),
      onFailure: err => reject(err),
      newPasswordRequired: function (userAttr) {
        user.completeNewPasswordChallenge(password, userAttr, this);
      }
    });
  });
};

export const signout = () => new Promise(resolve => {
  const user = getCurrentUser();
  if (!user) resolve();
  user.signOut();
  resolve();
});

/**
 * @returns { Promise<CognitoUser> }
 */
export const isValidSession = () => new Promise(resolve => {
  const user = getCurrentUser();
  if (!user) return resolve(null);
  user.getSession((err, session) => {
    if (err) { resolve(null) }
    else if (!session) { resolve(null) }
    else { resolve(user) }
  });
});

export const getToken = () => new Promise((resolve, reject) => {
  const user = getCurrentUser();
  if (!user) return resolve(null);
  user.getSession((err, session) => {
    if (err) return reject(err);
    if (!session.isValid()) return reject('Invalid session');
    resolve(session.getIdToken().getJwtToken());
  })
})
