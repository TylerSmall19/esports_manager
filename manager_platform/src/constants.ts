export const signupTypes = {
  org: 'ORG',
  team: 'TEAM'
};

export const appRoutes = {
  root: '/',
  players: {
    root: '/players/',
    scouting: '/players/scouting',
  },
  teams: {
    root: '/teams/',
    signUp: '/teams/new',
    viewActiveTeam: '/teams/active'
  },
}

export const MAX_PLAYERS = 5;