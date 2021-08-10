export const signupTypes = {
  org: 'ORG',
  team: 'TEAM'
};

export const appRoutes = {
  root: '/',
  players: {
    root: '/players/',
    scouting: '/players/scouting'
  },
  orgs: {
    root: '/orgs/',
    signUp: '/orgs/new'
  }
}

export const MAX_PLAYERS = 5;