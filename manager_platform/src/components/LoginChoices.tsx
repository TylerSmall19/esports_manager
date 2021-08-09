import React from 'react';
import { Link } from 'react-router-dom';
import { appRoutes } from '../constants';

const LoginChoices = (props : any) => {

  return (
    <div>
      <h2>I am a ...</h2>

      <Link to={appRoutes.orgs.signUp}>Sign Up</Link>&nbsp;
      <Link to={appRoutes.players.scouting}>Scouting</Link>
      {/* <button onClick={props.newOrg}>New Org</button> &nbsp;
      <button onClick={props.scoutingPlayers}>Team Scouting Players</button> */}
    </div>
  );
};

export { LoginChoices };