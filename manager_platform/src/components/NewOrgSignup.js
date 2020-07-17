import React, { useState } from 'react';

const NewOrgSignup = () => {
  const handleOrgSubmit = (vals) => (e) => {
    e.preventDefault();

    console.log(vals);
  }

  return (
    <div>
      <h3>First, let's get some basics about your Org</h3>
      <br />
      <NewOrgDetails onSubmit={handleOrgSubmit} />
    </div>
  );
};

const NewOrgDetails = (props) => {
  const { onSubmit } = props;

  const [formState, setFormState] = useState({});

  const setValue = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  }

  return (
    <form onSubmit={onSubmit(formState)}>
      <div>
        <label className='inputs' htmlFor='orgName'>Organization Name</label> 
        <br />
        <input id='orgName' type='text' name='orgName' value={formState.orgName || ''} onChange={setValue} />
      </div>

      <br />

      <div>
        <label className='inputs' htmlFor='ownerName'>Owner's Name (this will appear to users)</label>
        <br />
        <input id='ownerName' name='ownerName' type='text' value={formState.ownerName || ''} onChange={setValue} />
      </div>

      <br />

      <div>
        <button type='submit'>Save and Continue</button>
      </div>
    </form>
  );
}

export { NewOrgSignup };