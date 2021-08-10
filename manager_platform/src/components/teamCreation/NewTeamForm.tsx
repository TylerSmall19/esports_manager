import React, { useState } from 'react';

const NewTeamSignup = () => {
  const handleTeamSubmit = (vals : any) => (e : Event) => {
    e.preventDefault();

    console.log(vals);
  }

  return (
    <div>
      <h3>First, let's get some basics about your Team</h3>
      <br />
      <NewTeamDetails onSubmit={handleTeamSubmit} />
    </div>
  );
};

type FormValues = {
  name: string;
  ownerName: string;
  tag: string;
}

const NewTeamDetails = (props : any) => {
  const { onSubmit } = props;
  const initialState : FormValues = { name: '', ownerName: '', tag: '' };

  const [formState, setFormState] = useState<FormValues>(initialState);

  const setValue = (e : any) => {
    setFormState({ ...formState, [e.target?.name]: e.target.value });
  }

  return (
    <form onSubmit={onSubmit(formState)}>
      <div>
        <label className='inputs' htmlFor='name'>Team Name</label> 
        <br />
        <input id='name' type='text' name='name' value={formState.name || ''} onChange={setValue} />
      </div>

      <br />

      <div>
        <label className='inputs' htmlFor='ownerName'>Owner's Name (this will appear to users)</label>
        <br />
        <input id='ownerName' name='ownerName' type='text' value={formState.ownerName || ''} onChange={setValue} />
      </div>

      <br />

      <div>
        <label className='inputs' htmlFor='tag'>Team Tag</label>
        <br />
        <input id='tag' name='tag' type='text' value={formState.tag || ''} onChange={setValue} />
      </div>

      <br />

      <div>
        <button type='submit'>Save and Continue</button>
      </div>
    </form>
  );
}

export { NewTeamSignup };