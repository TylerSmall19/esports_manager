const _teamIdKey = 'teamId';
const _userIdKey = 'userId';
const _tokenKey = 'authToken';

const login = (userName : string, password: string) : boolean => {
  setUsersActiveTeam('6111ec9812962f1f2664e555');
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

const setUsersActiveTeam = (teamId: string) : void => {
  window.localStorage.setItem(_teamIdKey, teamId);
}

export const SessionService = {
  login,
  logOut,
  getTeamId,
  setUsersActiveTeam
}