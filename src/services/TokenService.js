const localStorageName = "user-suba-vote"

const getLocalRefreshToken = () => {
  const user = JSON.parse(localStorage.getItem(localStorageName));
  return user?.refreshToken;
};

const getLocalAccessToken = () => {
  const user = JSON.parse(localStorage.getItem(localStorageName));
  return user?.accessToken;
};

const updateLocalAccessToken = (token) => {
  let user = JSON.parse(localStorage.getItem(localStorageName));
  user.accessToken = token;
  localStorage.setItem(localStorageName, JSON.stringify(user));
};

const getUser = () => {
  return JSON.parse(localStorage.getItem(localStorageName));
};

const getUsername = () => {
  return JSON.parse(localStorage.getItem(localStorageName))?.username;
};

const getUserLevel = () => {
  return JSON.parse(localStorage.getItem(localStorageName))?.level;
};

const setUser = (user) => {
  localStorage.setItem(localStorageName, JSON.stringify(user));
};

const removeUser = () => {
  localStorage.removeItem(localStorageName);
};

const getToken = () => {
  return JSON.parse(localStorage.getItem(localStorageName))?.access_token;
}

const TokenService = {
  getLocalRefreshToken,
  getLocalAccessToken,
  updateLocalAccessToken,
  getUser,
  setUser,
  removeUser,
  getUsername,
  getToken,
  getUserLevel
};

export default TokenService;
