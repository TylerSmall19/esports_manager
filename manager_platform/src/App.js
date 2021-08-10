import React from 'react';
import './App.css';
import { NavigationHeader } from './components/nav/NavigationHeader.tsx';
import { NewTeamSignup } from './components/teamCreation/NewTeamForm.tsx';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { PlayerInfoList } from './components/playerScouting/playerInfoList';
import { appRoutes } from './constants.ts';
import { SessionService } from './services/session/sessionService';
import { TeamView } from './components/teamView/TeamView';

const App = () => {
  SessionService.login();

  return (
    <Router>
      <div className="App">
        <NavigationHeader />

        <Switch>
          <Route path={appRoutes.players.scouting} component={PlayerInfoList} />

          <Route path={appRoutes.teams.signUp} component={NewTeamSignup} />

          <Route path={appRoutes.teams.viewActiveTeam} component={TeamView} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
