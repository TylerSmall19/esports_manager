const _teamIdKey = 'teamId';
const _userIdKey = 'userId';
const _tokenKey = 'authToken';

const login = (userName : string, password: string) : boolean => {
  window.localStorage.setItem(_teamIdKey, '6110a58f683711f6518909b6');
  // TODO: Make these real values
  window.localStorage.setItem(_userIdKey, '1_Tyler');
  window.localStorage.setItem(_tokenKey, 'token');

  return true;
}

const logOut = () : boolean => {
  window.localStorage.clear();

  return true;
}

const getTeamId = () : string | null => {
  return window.localStorage.getItem(_teamIdKey);
} 

export const SessionService = {
  login,
  logOut,
  getTeamId
}