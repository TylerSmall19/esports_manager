import React from 'react';
import './App.css';
import { LoginChoices } from './components/LoginChoices.tsx';
import { NewOrgSignup } from './components/teamCreation/NewOrgSignup.tsx';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { PlayerInfoList } from './components/playerScouting/playerInfoList';
import { appRoutes } from './constants.ts';
import { SessionService } from './services/session/sessionService';

const App = () => {
  SessionService.login();

  return (
    <Router>
      <div className="App">
        <LoginChoices />
        
        <Switch>
          <Route path={appRoutes.players.scouting} component={PlayerInfoList} />

          <Route path={appRoutes.orgs.signUp} component={NewOrgSignup} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
