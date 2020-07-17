import React, { useState } from 'react';
import './App.css';
import { LoginChoices } from './components/LoginChoices';
import { NewOrgSignup } from './components/NewOrgSignup';

const App = () => {
  const [newOrg, setNewOrg] = useState(true);

  return (
    <div className="App">
      <LoginChoices newOrg={() => setNewOrg(true)} />
      
      {newOrg ? <NewOrgSignup /> : <p>Hello</p>}
    </div>
  );
}

export default App;
