import React from 'react';

const LoginChoices = (props) => {
  return (
    <div>
      <h2>I am a ...</h2>
      <button>New Team</button>
      <button onClick={props.newOrg}>New Organization</button>
    </div>
  );
};

export { LoginChoices };