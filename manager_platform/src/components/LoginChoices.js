import React from 'react';

const LoginChoices = (props) => {
  return (
    <div>
      <h2>I am a ...</h2>
      <button onClick={props.newTeam}>New Team</button>
      <button onClick={props.newOrg}>New Organization</button>
    </div>
  );
};

export { LoginChoices };