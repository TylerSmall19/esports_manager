import React from 'react';
import { PlayerInfoList } from './playerScouting/playerInfoList';

const LoginChoices = (props : any) => {

  return (
    <div>
      <h2>I am a ...</h2>
      <button onClick={props.newTeam}>New Team</button>
      <button onClick={props.newOrg}>New Organization</button>

      <PlayerInfoList />
    </div>
  );
};

export { LoginChoices };