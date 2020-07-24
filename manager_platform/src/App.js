import React, { useState } from 'react';
import './App.css';
import { LoginChoices } from './components/LoginChoices';
import { NewOrgSignup } from './components/NewOrgSignup';
import { signupTypes } from './constants';
import { NewTeamSignup } from './components/NewTeamSignup';

const App = () => {
  const [signupType, setSignupType] = useState('');

  return (
    <div className="App">
      <LoginChoices newTeam={() => setSignupType(signupTypes.team)} newOrg={() => setSignupType(signupTypes.org)} />

      {signupType === signupTypes.org ? <NewOrgSignup /> : <NewTeamSignup />}
    </div>
  );
}

export default App;
